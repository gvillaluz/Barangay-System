import { useNavigate } from "react-router-dom";
import { getToken, getUserRole } from "../../utils/auth";
import LoginPage from "./LoginPage";
import { useEffect } from "react";

const RootRoute = () => {
     const navigate = useNavigate();
    const token = getToken();
    const role = getUserRole();

    useEffect(() => {
        if (token) {
        navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/staff", { replace: true });
        }
    }, [token, role, navigate]);

    return !token ? <LoginPage /> : null;
}

export default RootRoute 