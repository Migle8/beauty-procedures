import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import proceduresStyle from "../styles/ProcedureInfo.module.css";
import { getLoggedInUser } from "../utils/auth/authenticate";
import CancelProcedure from "./CancelProcedure";
import ChangeProcedureDate from "./ChangeProcedureDate";
// import ProcdureRatings from "./ProcedureRatings";

function MyProcedureInfo() {

    const [allProcedures, setAllProcedures] = useState([]);
    const [showCancel, setShowCancel] = useState(false);
    const [showChangeDate, setShowChangeDate] = useState(false);

    const { procedures, categories, users } = useContext(StateContext);

    const { id } = useParams();

    const fprocedure = allProcedures.find((procedure) => procedure._id === id);

    const logedInUser = getLoggedInUser();
    const userId = logedInUser?.data._id;

    const specificUser = users.find((user) => user._id === userId);
    const userProcedures = specificUser ? specificUser.procedures : [];

    const procedureDates = userProcedures
        .filter((procedures) => procedures._id === id)
        .map((procedures) => procedures.date);

    const { mainBackground, homeHeader } = styles;
    const { procedureBackBtn, procedureInfoPage, procedurePage, procedureInformation, procedureImage, procedureShortInfo, procedureRegisterDate, procedureDate, procedureTime, procedurePrice, procedureCategory, procedureButtons, procedureRatings } = proceduresStyle;

    const handleShowCancel = () => { setShowCancel(true) };

    const handleShowRegister = () => { setShowChangeDate(true) };

    useEffect(() => {
        setAllProcedures(procedures);
    }, [procedures]);

    const getCategoryTitle = (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId);
        return category ? category.title : "Unknown Category";
    };

    return (
        <>
            <div className={mainBackground}>
                <div className={procedureBackBtn}>
                    <Link to={"/myprocedures"}>
                        <Button variant="warning">
                            &#11178;
                            Go Back</Button>
                    </Link>
                </div>
                <div className={procedureInfoPage}>
                    {fprocedure && (
                        <div className={procedurePage}>
                            <h1 className={homeHeader}>{fprocedure.name}</h1>
                            <div className={procedureInformation}>
                                <img
                                    src={fprocedure.image}
                                    alt="Procedure image"
                                    className={procedureImage}
                                />
                                <div className={procedureShortInfo}>
                                    {procedureDates.map((date, index) => (
                                        <p className={procedureRegisterDate} key={index}>You are registered for this procedure on {date} {fprocedure.time}h</p>
                                    ))}
                                    <p className={procedureDate}>All dates: {fprocedure.date.join(" | ")}</p>
                                    <p className={procedureTime}>Time: {fprocedure.time}</p>
                                    <p className={procedurePrice}>Price: {fprocedure.price} €</p>
                                    <p className={procedureCategory}>
                                        Category: {getCategoryTitle(fprocedure.category)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className={procedureButtons}>
                                    <Button
                                        variant="warning"
                                        className="me-3"
                                        onClick={handleShowRegister}
                                    >Edit Date</Button>
                                    <Button
                                        variant="light"
                                        onClick={handleShowCancel}
                                    >Cancel Procedure</Button>
                                </div>
                                <CancelProcedure showCancel={showCancel} setShowCancel={setShowCancel} fprocedure={fprocedure} />
                                <ChangeProcedureDate showChangeDate={showChangeDate} setShowChangeDate={setShowChangeDate} fprocedure={fprocedure} />
                            </div>
                        </div>
                    )}
                            {/* <div className={procedureRatings}>
                                <ProcdureRatings procedure={fprocedure} />
                            </div> */}
                </div>
            </div >
        </>
    );
}

export default MyProcedureInfo;