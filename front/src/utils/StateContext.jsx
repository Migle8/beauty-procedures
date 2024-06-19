import { createContext, useEffect, useState } from "react";
import { getAllData, getCategories, getUsers } from "../services/get";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [procedures, setProcedures] = useState([]);
    const [update, setUpdate] = useState(0);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleShow = () => setShow(true);

    const fetchProcedures = async () => {
        try {
            const { data: { procedures } } = await getAllData();
            setProcedures(procedures);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const { data: { users } } = await getUsers();
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const { data } = response;
            setCategories(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProcedures();
        fetchUser();
        fetchCategories();
    }, [update]);

    return (
        <StateContext.Provider value={{ procedures, setProcedures, update, setUpdate, error, setError, show, setShow, users, setUsers, categories, setCategories, handleShow }}>
            {children}
        </StateContext.Provider>
    );
};