import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload); 
    return decoded.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isAdmin = () => {
  return getUserRole() === "admin";
};

export const isStaff = () => {
  return getUserRole() === "staff";
};

export const verifyToken = () => {
  const token = localStorage.getItem("token");

  if (!token)
    return true;

  const decoded = jwtDecode(token);

  console.log(decoded.exp)

  const isExpired = decoded.exp * 1000 < Date.now();

  if (isExpired) {
    removeToken();
    return true;
  }

  return false;
}