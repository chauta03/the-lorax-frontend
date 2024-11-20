import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: process.env.REACT_APP_FASTAPI_URL,
});

api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        const navigate = useNavigate();

        if (error.response?.status === 401) {
            const errorMessage = error.response?.data?.detail;

            if (errorMessage === "Token has expired") {
                alert("Your session has expired. Please log in again.");
                // Clear token from storage
                localStorage.removeItem("token");
                // Redirect to login page
                navigate("/login");
            }
        }

        return Promise.reject(error); // Propagate other errors
    }
);

export default api;
