import React, { useState, useEffect } from "react";

const AddOrEditTaskModal = ({
  onSave,
  onCancel,
  initialTitle = "",
  initialStatus = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [isCompleted, setIsCompleted] = useState(initialStatus);
  const isEditMode = !!initialTitle; // Determine if it's edit mode based on initialTitle

  useEffect(() => {
    setTitle(initialTitle);
    setIsCompleted(initialStatus);
  }, [initialTitle, initialStatus]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, completed: isCompleted });
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>
      </div>
      <div className="modal-body">
        <div>
          <label>Task Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={isCompleted}
            onChange={(e) =>
              !isEditMode && setIsCompleted(e.target.value === "true")
            }
            disabled={isEditMode}
          >
            <option value={false}>Not Completed</option>
            <option value={true}>Completed</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddOrEditTaskModal;
