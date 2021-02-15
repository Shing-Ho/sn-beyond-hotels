import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Upload, Button, Spin } from 'antd';

import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as TrashIcon } from 'icons/secondaryTrash.svg';

import styles from './VenueMediaUpload.module.scss';

export default function VenueMediaUpload({
  loading,
  venue,
  onUploadVenueMedia,
  onUpdateVenueMediaOrder,
  onRemoveVenueMedia,
}) {
  const [venueMedia, setVenueMedia] = useState([]);
  const { Dragger } = Upload;
  const draggerProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    customRequest({ file }) {
      onUploadVenueMedia(file);
    },
  };

  useEffect(() => {
    if (venue && venue.media) {
      setVenueMedia(venue.media.sort((a, b) => a.order - b.order));
    }
  }, [venue]);

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
    const ordered = reorder(venueMedia, result.source.index, result.destination.index);

    const orders = [];
    if (ordered.length > 0) {
      ordered.map((order) => orders.push(order.id));
    }
    setVenueMedia(ordered);
    onUpdateVenueMediaOrder(orders);
  };

  const onRemove = (id) => {
    onRemoveVenueMedia(id);
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
    <div className={styles.uploadContainer}>
      {loading && <Spin />}
      <div className={styles.draggerContainer}>
        <Dragger {...draggerProps}>
          <p className={styles.dragTitle}>
            Click <small>or</small> Drag to + <b>Add New Photo</b>
          </p>
          <p className={styles.dragDescription}>
            <b>Files Supported:</b> jpg, png, gif &nbsp;&nbsp;&nbsp; <b>Suggested Minimum Size:</b> 600 x 600 Pixels
          </p>
        </Dragger>
      </div>
      <div className={styles.listDescription}>
        <p>Drag the added photos below, up and down, to adjust the order they are displayed.</p>
        <b>{`${venueMedia.length} Photos`}</b>
      </div>
      {venueMedia.length > 0 && (
        <div className={styles.listContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(drop, snapshot) => (
                <div {...drop.droppableProps} ref={drop.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {venueMedia.map((item, index) => (
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
                              <div className={styles.imgName}>{`Venue_Photo_${item.id}`}</div>
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
  );
}
