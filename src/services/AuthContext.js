import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = Object.keys(localStorage).find(
      (key) => key && !key.startsWith("tasks_")
    );
    return storedUser || null;
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userTasks = JSON.parse(localStorage.getItem(`tasks_${user}`)) || [];
      setTasks(userTasks);
    }
    setLoading(false);
  }, [user]);

  const login = (username) => {
    setUser(username);
    localStorage.setItem(username, JSON.stringify({ username }));
    const userTasks =
      JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
    setTasks(userTasks);
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    localStorage.removeItem(user);
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user}`, JSON.stringify(newTasks));
  };

  const updateTask = (index, updatedTask) => {
    const newTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user}`, JSON.stringify(newTasks));
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user}`, JSON.stringify(newTasks));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </AuthContext.Provider>
  );
};
