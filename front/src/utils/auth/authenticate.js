import axios from "axios";

export const login = async (values) => {
    const response = await axios.post(
        "http://localhost:3003/api/v1/users/login",
        values
    );

    localStorage.setItem("user", JSON.stringify(response.data));
};

export const getLoggedInUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return null;
    return loggedInUser;
};

export const authenticate = () => {
    const loggedInUser = getLoggedInUser();
    const token = loggedInUser ? loggedInUser.token : null;

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const signUp = async (values) => {
    const response = await axios.post(
        "http://localhost:3003/api/v1/users/signup",
        values
    );

    localStorage.setItem("user", JSON.stringify(response.data));
};
