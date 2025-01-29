import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../src/pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { Provider } from 'react-redux';
import store from './redux/store';
import ProtectRoute from './pages/protectRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

          {/* Routes protégées */}
          <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
