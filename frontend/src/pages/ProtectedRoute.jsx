import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    return localStorage.getItem("token") !== null ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;