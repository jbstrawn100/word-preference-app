// StepOneReview.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StepOneReview = ({ responses, onBack, onNext }) => {
  const [updatedResponses, setUpdatedResponses] = useState({
    yes: [...responses.yes],
    maybe: [...responses.maybe],
    no: [...responses.no],
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(updatedResponses[source.droppableId]);
    const [moved] = sourceList.splice(source.index, 1);
    const destList = Array.from(updatedResponses[destination.droppableId]);
    destList.splice(destination.index, 0, moved);

    setUpdatedResponses(prev => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    }));
  };

  const columnLabels = {
    yes: 'Yes',
    maybe: 'Maybe',
    no: 'No',
  };

  return (
    <div className="text-center">
      <h2 className=" mb-4">Review & Adjust Step 1 Selections</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 mb-6">
          {Object.entries(columnLabels).map(([key, label]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  className="flex-1 bg-white border rounded p-2 min-h-[200px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className=" mb-2 text-center">{label}</h3>
                  {updatedResponses[key].map((word, index) => (
                    <Draggable key={word} draggableId={word} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 border-b last:border-none bg-gray-50 rounded mb-1 shadow-sm"
                        >
                          {word}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div className="flex justify-center gap-4">
        <button onClick={onBack} className="">
          <span className="">Back</span>
        </button>
        <button onClick={() => onNext(updatedResponses)} className=" --raised">
          <span className="">Confirm and Continue</span>
        </button>
      </div>
    </div>
  );
};

export default StepOneReview;