import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import Login from "./components/login";

import Tasks from "./components/tasks";
import PrivateRoute from "./components/privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PrivateRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
