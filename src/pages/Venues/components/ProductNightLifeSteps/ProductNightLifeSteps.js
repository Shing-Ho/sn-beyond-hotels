import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Upload, Button, Input } from 'antd';
import cx from 'classnames';
import { Steps, Step } from 'components/Steps/Steps';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as TrashIcon } from 'icons/secondaryTrash.svg';
import styles from './ProductNightLifeSteps.module.scss';

const steps = [
  {
    step: 1,
    title: 'Name',
  },
  {
    step: 2,
    title: 'Price',
  },
  {
    step: 3,
    title: 'Capacity',
  },
  {
    step: 4,
    title: 'Photos',
  },
];

export default function ProductNightLifeSteps({
  onCancel,
  product,
  setProduct,
  onHandleProduct,
  onUploadProductMedia,
  onUpdateProductMediaOrder,
  onRemoveProductMedia,
  selectedStep,
}) {
  const [currentStep, setCurrentStep] = useState(selectedStep);
  const [error, setError] = useState({ productName: false, price: false, capacity: false });
  const [productMedia, setproductMedia] = useState([]);
  const { Dragger } = Upload;

  useEffect(() => {
    setCurrentStep(selectedStep);
  }, [selectedStep]);

  const handleStep = (step, isBack) => {
    if (!isBack) {
      if (currentStep === 0 && !product.productName) {
        setError({
          ...error,
          productName: true,
        });
        return;
      }
      if (currentStep === 1 && !product.price) {
        setError({
          ...error,
          price: true,
        });
        return;
      }
      if (currentStep === 2 && !product.capacity) {
        setError({
          ...error,
          capacity: true,
        });
        return;
      }
    }
    if (step < 0 || step > 3) {
      onCancel();
      setCurrentStep(0);
    } else if (step === 3) {
      onHandleProduct();
      if (product.isCreate) {
        setCurrentStep(0);
        onCancel();
      } else {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleBlur = (type) => () => {
    if (!product[type]) {
      setError({
        ...error,
        [type]: true,
      });
      return;
    }
    setError({
      ...error,
      [type]: false,
    });
  };

  const draggerProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    customRequest({ file }) {
      onUploadProductMedia(file, product);
    },
  };

  useEffect(() => {
    if (product && product.media) {
      setproductMedia(product.media.sort((a, b) => a.order - b.order));
    }
  }, [product.media]);

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
    const ordered = reorder(productMedia, result.source.index, result.destination.index);

    const orders = [];
    if (ordered.length > 0) {
      ordered.map((order) => orders.push(order.id));
    }

    const isSame =
      ordered.length === productMedia.length && ordered.every((element, index) => element === productMedia[index]);

    if (orders.length > 0 && !isSame) {
      setproductMedia(ordered);
      onUpdateProductMediaOrder(orders);
    }
  };

  const onRemove = (id) => {
    onRemoveProductMedia(id);
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

  return (
    <div className={styles.venuesProductsSteps}>
      <div className={styles.stepsContainer}>
        <Steps current={currentStep} venuesMode labelPlacement="vertical">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={<div>{item.step}</div>} />
          ))}
        </Steps>
      </div>
      <div className={styles.content}>
        {currentStep === 0 && (
          <div className={styles.step1}>
            <h1>Product Name</h1>
            <div className={cx(styles.input, { [styles.error]: error.productName === true })}>
              <Input
                name="productName"
                placeholder="Enter Product Name"
                maxLength={30}
                suffix={<div className={styles.suffix}>&nbsp;</div>}
                value={product.productName}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur('productName')}
              />
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className={styles.step2}>
            <h1>Product Price</h1>
            <div className={cx(styles.input, { [styles.error]: error.price === true })}>
              <Input
                name="price"
                placeholder="Enter Product Price"
                prefix={<div className={styles.prefix}>$</div>}
                suffix={<div className={styles.suffix}>USD</div>}
                value={product.price}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur('price')}
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.step3}>
            <h1>Product Capacity</h1>
            <div className={cx(styles.input, { [styles.error]: error.capacity === true })}>
              <Input
                name="capacity"
                placeholder="Enter Product Capacity"
                prefix={
                  <div className={styles.prefix}>
                    <i className="fa fa-user" />
                  </div>
                }
                value={product.capacity}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur('capacity')}
              />
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className={styles.step4}>
            <h1>Product Photos</h1>
            <div className={styles.uploadContainer}>
              <div className={styles.draggerContainer}>
                <Dragger {...draggerProps}>
                  <p className={styles.dragTitle}>
                    Click <small>or</small> Drag to + <b>Add New Photo</b>
                  </p>
                  <p className={styles.dragDescription}>
                    <b>Files Supported:</b> jpg, png, gif &nbsp;&nbsp;&nbsp; <b>Suggested Minimum Size:</b> 600 x 600
                    Pixels
                  </p>
                </Dragger>
              </div>
              <div className={styles.listDescription}>
                <p>Drag the added photos below, up and down, to adjust the order they are displayed.</p>
                <b>{`${productMedia.length} Photos`}</b>
              </div>
              {productMedia.length > 0 && (
                <div className={styles.listContainer}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(drop, snapshot) => (
                        <div {...drop.droppableProps} ref={drop.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                          {productMedia.map((item, index) => (
                            <Draggable key={item.id} draggableId={`item_${item.id}`} index={index}>
                              {(drag) => (
                                <div
                                  ref={drag.innerRef}
                                  {...drag.draggableProps}
                                  style={getItemStyle(drag.draggableProps.style)}
                                >
                                  <div className={styles.imgItem}>
                                    <div className={styles.imgItemLeft}>
                                      <img src={item.url} alt={item.id} />
                                      <div className={styles.imgName}>{`Product_Photo_${item.id}`}</div>
                                    </div>
                                    <div className={styles.imgItemRight}>
                                      <Button className={styles.trashIcon} onClick={() => onRemove(item.id)}>
                                        <TrashIcon width={20} height={20} />
                                      </Button>
                                      <div className={styles.dragDiv} {...drag.dragHandleProps}>
                                        <DragIcon />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {drop.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Button className={[styles.btn, styles.cancel]} onClick={() => handleStep(currentStep - 1, 'back')}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button className={[styles.btn, styles.continue]} onClick={() => handleStep(currentStep + 1)}>
          {(currentStep === 0 || currentStep === 1) && 'Continue'}
          {currentStep === 2 && 'Save'}
          {currentStep === 3 && 'Finish'}
        </Button>
      </div>
    </div>
  );
}
