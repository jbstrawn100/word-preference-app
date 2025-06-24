import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StepThree = ({ words, onComplete }) => {
  const [rankedWords, setRankedWords] = useState([...words]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const updated = [...rankedWords];
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    setRankedWords(updated);
  };

  return (
    <div className="text-center">
      <h2 className="mdc-typography--headline6 mb-4">Step 3: Rank Your Selections</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ranking">
          {(provided) => (
            <ul className="space-y-2 max-w-md mx-auto bg-white p-4 rounded shadow" {...provided.droppableProps} ref={provided.innerRef}>
              {rankedWords.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 border rounded bg-gray-50"
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
      <button className="mt-6 mdc-button mdc-button--raised" onClick={() => onComplete(rankedWords)}>
        <span className="mdc-button__label">Finish</span>
      </button>
    </div>
  );
};

export default StepThree;
