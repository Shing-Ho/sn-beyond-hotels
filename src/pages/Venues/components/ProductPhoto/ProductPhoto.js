import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'antd';

import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as TrashIcon } from 'icons/secondaryTrash.svg';
import styles from './ProductPhoto.module.scss';

export default function ProductPhoto() {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      if (acceptedFiles && acceptedFiles.length) {
        let temp = [];
        temp = acceptedFiles.map((aFile) =>
          Object.assign(aFile, { id: `item-${images.length}`, preview: URL.createObjectURL(aFile) }),
        );
        setImages(Object.assign([], [...images, ...temp]));
      }
    },
    [images],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = () => ({
    background: 'transparent',
    padding: grid,
    width: '100%',
  });

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

    setImages(reorder(images, result.source.index, result.destination.index));
  };

  const onRemove = (index) => {
    const temp = Object.assign([], images);
    temp.splice(index, 1);
    setImages(temp);
  };

  return (
    <div className={styles.main}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} accept="image/x-png,image/gif,image/jpeg" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className={styles.dropzoneText}>
            <span className={styles.topText}>
              Click or Drag to
              <span className={styles.boldText}> + Add New Photo</span>
            </span>
            <span className={styles.smallText}>
              File supported: jpg, png, gif Suggested Minimum Size: 600 * 600 Pixels
            </span>
          </div>
        )}
      </div>
      <div className={styles.descriptionDiv}>
        <span className={styles.description}>
          Drag the added photos below, up and down, to adjust the order they are displayed. The top photo will always be
          the Main Photo.{' '}
        </span>
        <span className={styles.count}>{images.length}/10 Photos</span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {images.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided1) => (
                    <div
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided1.draggableProps.style)}
                    >
                      <div className={styles.imgItem}>
                        <div className={styles.imgItemLeft}>
                          <img src={item.preview} alt={item.preview} />
                          <div className={styles.imgName}>{item.name}</div>
                        </div>
                        <div className={styles.imgItemRight}>
                          {index === 0 ? <span className={styles.mainPhoto}>MAIN PHOTO</span> : null}
                          <Button className={styles.trashIcon} onClick={() => onRemove(index)}>
                            <TrashIcon />
                          </Button>
                          <div className={styles.dragDiv}>
                            <DragIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
