import axios from "axios";
import { toast } from "react-toastify";
const baseUrl=import.meta.env.VITE_BASE_URL
const userBaseUrl =baseUrl ;

const createAxiosInstance = (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,  // Corrected key from userBaseUrl to baseURL
        timeout: 200000,
        timeoutErrorMessage: "Request timeout... Please try again!"
    });
    return instance;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return req;
};

// Request interceptor
export const userAxiosInstance = createAxiosInstance(userBaseUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "usertoken");
    return modifiedReq;
});

// Response interceptor
userAxiosInstance.interceptors.response.use(
    (response) => response,
    console.log("response"),
    (error) => handleAxiosError(error)
);

// Handle error
const handleAxiosError = (error) => {
    const errorMessage = error.response ? error.response.data.message : "An error occurred while requesting.";
    if (error.response) {
        if (error.response.status === 404) {
            toast.error("404-Resource Not Found");
        } else if (error.response.status === 500) {
            toast.error("500-Internal Server Error");
        } else {
            toast.error(errorMessage);
        }
    } else {
        toast.error(errorMessage);
    }
};
