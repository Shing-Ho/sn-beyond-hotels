import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Button, Modal as asModal } from 'antd';

import venueActions from 'store/venue/actions';

import Modal from 'components/Modal/Modal';
import ProductNightLifeSteps from '../ProductNightLifeSteps/ProductNightLifeSteps';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

export default function ProductList({ venue, group, products }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState(0);

  const [product, setProduct] = useState({
    modalTitle: 'Add Product',
    productName: '',
    price: 0,
    capacity: 0,
    isCreate: true,
    media: [],
    status: true,
    id: null,
  });
  const [orderedProducts, setOrderedProducts] = useState(products || []);

  useEffect(() => {
    if (products) {
      let currentProduct = null;
      if (product && product.id && !product.isCreate) {
        currentProduct = products.find((object) => object.id === product.id);
      }
      if (currentProduct) {
        setProduct({
          modalTitle: 'Edit Product',
          productName: currentProduct.name,
          price: currentProduct.price,
          capacity: currentProduct.capacity,
          isCreate: false,
          media: currentProduct.media,
          status: currentProduct.status,
          id: currentProduct.id,
        });
      }
      setOrderedProducts(products.sort((a, b) => a.order - b.order));
    }
  }, [products]);

  const handleProduct = (item, mode, step = 0) => {
    if (item) {
      setProduct({
        modalTitle: 'Edit Product',
        productName: item.name,
        price: item.price,
        capacity: item.capacity,
        isCreate: false,
        media: item.media,
        status: item.status,
        id: item.id,
      });
    } else {
      setProduct({
        modalTitle: 'Add Product',
        productName: '',
        price: 0,
        capacity: 0,
        isCreate: true,
        media: [],
        status: true,
        id: null,
      });
    }
    setModalStep(step);
    setModalVisible(mode);
  };

  const onHandleProduct = () => {
    if (venue && group) {
      const payload = {
        venue: venue.id,
        name: product.productName,
        price: product.price,
        capacity: product.capacity,
        status: product.status,
        product_group: group.id,
      };
      if (product.isCreate) {
        dispatch(venueActions.createVenueProductNightLife(payload));
      } else {
        payload.id = product.id;
        dispatch(venueActions.updateVenueProductNightLife(payload));
      }
    }
  };

  const onUpdateActive = (item, status) => {
    if (venue && group) {
      const payload = {
        venue: venue.id,
        name: item.name,
        price: item.price,
        capacity: item.capacity,
        status,
        product_group: group.id,
        id: item.id,
      };
      dispatch(venueActions.updateVenueProductNightLife(payload));
    }
  };

  const { confirm } = asModal;

  const onRemove = (id) => {
    if (venue && group) {
      const payload = {
        venue: venue.id,
        id,
      };
      confirm({
        title: 'Are you sure delete this product?',
        content: 'We will remove everything.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          dispatch(venueActions.removeVenueProductNightLife(payload));
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const ordered = reorder(orderedProducts, result.source.index, result.destination.index);

    const orders = [];
    if (ordered.length > 0) {
      ordered.map((order) => orders.push(order.id));
    }

    const isSame =
      ordered.length === orderedProducts.length &&
      ordered.every((element, index) => element === orderedProducts[index]);

    if (venue && orders.length > 0 && !isSame) {
      const payload = {
        venue: venue.id,
        order: orders,
      };
      setOrderedProducts(ordered);
      dispatch(venueActions.updateVenueProductNightLifeOrder(payload));
    }
  };

  const getListStyle = () => ({
    background: 'transparent',
    width: '100%',
  });

  const getItemStyle = (draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 20px 0`,

    // change background colour if dragging
    background: 'transparent',
    boxSizing: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const onUploadProductMedia = (file, item) => {
    if (venue && item) {
      const formData = new FormData();
      formData.append('venue', venue.id);
      formData.append('url', file);
      formData.append('product', item.id);
      formData.append('thumbnail', 'thumbnail');

      const payload = {
        venue: venue.id,
        formData,
      };

      dispatch(venueActions.uploadVenueProductNightLifeMedia(payload));
    }
  };

  const onUpdateProductMediaOrder = (orders) => {
    if (venue) {
      const payload = {
        venue: venue.id,
        order: orders,
      };
      dispatch(venueActions.updateVenueProductNightLifeMediaOrder(payload));
    }
  };

  const onRemoveProductMedia = (id) => {
    if (venue) {
      const payload = {
        venue: venue.id,
        id,
      };
      dispatch(venueActions.removeVenueProductNightLifeMedia(payload));
    }
  };

  return (
    <div className={styles.productListContainer}>
      <div className={styles.productList}>
        {orderedProducts && orderedProducts.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(drop, snapshot) => (
                <div {...drop.droppableProps} ref={drop.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {orderedProducts.map((item, index) => (
                    <Draggable key={item.id} draggableId={`item_${item.id}`} index={index}>
                      {(drag) => (
                        <div
                          ref={drag.innerRef}
                          {...drag.draggableProps}
                          style={getItemStyle(drag.draggableProps.style)}
                        >
                          <ProductItem
                            key={item.id}
                            product={item}
                            mode={false}
                            {...{ handleProduct, onRemove, onUpdateActive, drag }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {drop.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      <Button className={[styles.addBtn, styles.product]} onClick={() => handleProduct(null, true, 0)}>
        <i className="fa fa-plus" aria-hidden="true" /> Add Product
      </Button>
      <Modal
        title={product.modalTitle}
        visible={modalVisible}
        footer={null}
        centered
        width={1000}
        onCancel={() => handleProduct(null, false, 0)}
      >
        <ProductNightLifeSteps
          onCancel={() => handleProduct(null, false, 0)}
          selectedStep={modalStep}
          {...{
            product,
            setProduct,
            onHandleProduct,
            onUploadProductMedia,
            onUpdateProductMediaOrder,
            onRemoveProductMedia,
          }}
        />
      </Modal>
    </div>
  );
}
