import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { ColorContextProvider } from './ColorContext/darkContext';
import Login from './Pages/Login/Login';
// import Lists from './Pages/Lists/Lists';

// const router = createBrowserRouter([
//     // {
//     //     path: '/',
//     //     element: <App />,
//     //     errorElement: <PageNotFound />,
//     // },
//     {
//         path: '/login',
//         element: <Login />,
//         errorElement: <PageNotFound />,
//     },
//     // {
//     //     path: 'users',
//     //     element: <Lists />,
//     //     errorElement: <PageNotFound />,
//     // },
//     {
//         path: 'user/:userId',
//         element: <Detail />,
//         errorElement: <PageNotFound />,
//     },
// ]);

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const ProtectedRoute = ({ element: Component, ...rest }) => (
    isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ColorContextProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<ProtectedRoute element={App} />} />
            </Routes>
        </Router>
    </ColorContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
