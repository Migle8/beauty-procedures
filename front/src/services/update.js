import axios from "axios";
import { authenticate } from "../utils/auth/authenticate";
const API_URL = import.meta.env.VITE_API_URL;
const API_ALL = import.meta.env.VITE_API_ALL;

export const updateData = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data, {
    headers: {
        'Content-Type': "multipart/form-data"
    }
});
  return response.data;
}

export const updateMyData = async (id, data) => {
  authenticate();
  const response = await axios.patch(`${API_ALL}/${id}`, data) 
    // headers: {
    //     'Content-Type': "multipart/form-data"
    // }
    

  return response.data;
};