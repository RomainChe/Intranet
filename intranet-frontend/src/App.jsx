import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import TopBar from './components/Topbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import Profile from './components/Profile.jsx';
import AddEmployee from './components/AddEmployee.jsx';
import EditEmployee from './components/EditEmployee.jsx';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

const AdminRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const isAdmin = localStorage.getItem('admin') !== null;

  return isAuthenticated && isAdmin ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<PrivateRoute element={<EmployeeList />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/update-profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/add-employee" element={<AdminRoute element={<AddEmployee />} />} />
        <Route path="/edit-employee/:employeeId" element={<AdminRoute element={<EditEmployee />} />} />
      </Routes>
    </Router>
  );
}

export default App;
