import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/auth/authenticate";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    const logedInUser = getLoggedInUser();

    useEffect(() => {
        if (!logedInUser) {
            return navigate("/");
        }
    }, [logedInUser, navigate])
    return (<>{children}</>);
}

export default ProtectedRoute;