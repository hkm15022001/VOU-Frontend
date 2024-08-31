import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { ColorContextProvider } from './ColorContext/darkContext';
import Login from './Pages/Login/Login';
import SignUpEnterprise from './Pages/SignUp/SignUpEnterprise';
import SignUpEndUser from './Pages/EndUser/SignUp';

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;  //<Navigate to="/login" replace />
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HelmetProvider>
        <ColorContextProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup-enterprise" element={<SignUpEnterprise />} />
                    <Route path="/signup-end-user" element={<SignUpEndUser />} />
                    <Route path="/*" element={<ProtectedRoute element={<App />} />} />
                </Routes>
            </Router>
        </ColorContextProvider>
    </HelmetProvider>
);
