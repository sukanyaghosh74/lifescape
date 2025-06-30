import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import GoalForm from './components/Goals/GoalForm';
import GoalDetail from './components/Goals/GoalDetail';

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.user.token);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/goals/new" element={<PrivateRoute><GoalForm /></PrivateRoute>} />
        <Route path="/goals/:id/edit" element={<PrivateRoute><GoalForm /></PrivateRoute>} />
        <Route path="/goals/:id" element={<PrivateRoute><GoalDetail /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
