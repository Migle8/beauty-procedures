import axios from "axios";
import { authenticate } from "../utils/auth/authenticate";

const API_URL = import.meta.env.VITE_API_URL;
const API_ALL = import.meta.env.VITE_API_ALL;

export const postData = async (data) => {
    let response = await axios.post(API_URL, data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });
    return response.data;
}

export const postMyData = async (id, data) => {
    authenticate();
    const response = await axios.post(`${API_ALL}/${id}`, data);
    return response.data;
}