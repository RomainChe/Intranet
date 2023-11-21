import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './components/Topbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;