import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import Modal from "../modal/modal";
import AddOrEditTaskModal from "./addOrEditTask";
import "./index.css";
import MyTaskCompleted from "../../icons/myTaskCompleted";
import MyTaskNotCompleted from "../../icons/myTaskNotCompleted";

const Tasks = () => {
  const { user, tasks, addTask, updateTask, deleteTask, logout } =
    useContext(AuthContext);
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const openAddTaskModal = () => {
    setEditIndex(null);
    setEditTask(null);
    setIsShowAddTaskModal(true);
  };

  const openEditTaskModal = (task, index) => {
    setEditIndex(index);
    setEditTask(task);
    setIsShowAddTaskModal(true);
  };

  const handleSaveTask = (task) => {
    if (editIndex === null) {
      addTask(task);
    } else {
      updateTask(editIndex, task);
    }
    setIsShowAddTaskModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleLogoutPopup = () => {
    setShowLogoutPopup((prev) => !prev);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(index, updatedTask);
  };

  return (
    <div className="tasks-container">
      <div className="header">
        <h2>Welcome, {user}</h2>
        <div className="logout-button" onClick={toggleLogoutPopup}>
          {user.charAt(0).toUpperCase()}
        </div>
        {showLogoutPopup && (
          <div className="logout-popup">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="my-tasks">
        <div className="task-items">
          <div className="task-date-container">
            <div className="task-date-heading">
              My Task
              <div className="task-header-icons">
                <button className="add-task-button" onClick={openAddTaskModal}>
                  Add Task
                </button>
              </div>
            </div>
            <ul className="task-list">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <li key={index} className="task-item">
                    <div className="task-icon-with-title">
                      <div
                        className={`${
                          task.completed ? "icon-disabled" : "icons"
                        }`}
                        onClick={
                          !task.completed
                            ? () => toggleTaskCompletion(index)
                            : () => {}
                        }
                      >
                        {task.completed ? (
                          <MyTaskCompleted />
                        ) : (
                          <MyTaskNotCompleted />
                        )}
                      </div>
                      <div>{task.title}</div>
                    </div>
                    <div className="task-buttons">
                      <button
                        className="edit-task-button"
                        onClick={() => openEditTaskModal(task, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-task-button"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No Task Found</p>
              )}
            </ul>
          </div>
        </div>
        {isShowAddTaskModal && (
          <Modal onClose={() => setIsShowAddTaskModal(false)}>
            <AddOrEditTaskModal
              initialTitle={editTask ? editTask.title : ""}
              initialStatus={editTask ? editTask.completed : false}
              onSave={handleSaveTask}
              onCancel={() => setIsShowAddTaskModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Tasks;
