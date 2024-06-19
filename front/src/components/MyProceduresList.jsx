import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { getLoggedInUser } from "../utils/auth/authenticate";

import styles from "../styles/Procedures.module.css";
import MyProceduresCard from "./MyProceduresCard";

function MyProceduresList() {
    const { error, users } = useContext(StateContext);

    const { proceduresList } = styles;

    const logedInUser = getLoggedInUser();

    const currentUser = users.find(user => user._id === logedInUser?.data._id);

    return (
        <>
            <div className={proceduresList}>
                {currentUser && currentUser.procedures.map((procedure) =>
                    <MyProceduresCard key={procedure._id} procedure={procedure} />
                )
                }
            </div>
            {error}
        </>
    );
}

export default MyProceduresList;
