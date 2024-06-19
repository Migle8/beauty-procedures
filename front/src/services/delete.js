import axios from "axios";
import { authenticate } from "../utils/auth/authenticate";

const API_URL = import.meta.env.VITE_API_URL;
const API_ALL = import.meta.env.VITE_API_ALL;

export const deleteData = async (id) => {
    // const { name } = await getOne(id);

    // const confirmed = window.confirm(`Are you sure you want to delete ${name} excursion?`);
    // if (!confirmed) return;

    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export const deleteMyData = async (id) => {
    authenticate();
    const response = await axios.delete(`${API_ALL}/${id}`);
    return response.data;
  };