import axios from "axios";
import {authenticate} from "../utils/auth/authenticate";

const API_URL = import.meta.env.VITE_API_URL;
const API_URS = import.meta.env.VITE_API_URS;
const API_URC = import.meta.env.VITE_API_URC;

export const getAllData = async() => {
    authenticate();
    const response = await axios.get(API_URL);
    return response.data;
};

export const getOne = async(id) => {
    authenticate();
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export const getUsers = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URS);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCategories = async () => {
    authenticate();
    const response = await axios.get(API_URC);
    // console.log(response.data);
    return response.data;
  };