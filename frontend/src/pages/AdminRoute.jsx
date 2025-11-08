import { Outlet, Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const AdminRoute = () => {
    const isUserAdmin = isAdmin();
    return isUserAdmin ? <Outlet /> : <Navigate to="/dashboard/staff" replace />;
}

export default AdminRoute;

