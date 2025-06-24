// StepThree.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StepThree = ({ words, onComplete }) => {
  const [items, setItems] = useState(words);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setItems(reordered);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6">Step 3: Rank your words</h2>
      <p className="mb-4 text-gray-600">Drag and drop to reorder your preferred words</p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="wordList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-white shadow rounded p-4 mb-6 space-y-2"
            >
              {items.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 bg-gray-100 rounded shadow-sm text-left"
                    >
                      {word}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={() => onComplete(items)}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
};

export default StepThree;
