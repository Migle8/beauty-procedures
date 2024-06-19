import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import proceduresStyle from "../styles/ProcedureInfo.module.css";
import DeleteProcedure from "./DeleteProcedure";
import EditProcedure from "./EditProcedure";
import { getLoggedInUser } from "../utils/auth/authenticate";
import RegisterToProcedure from "./RegisterToProcedureModal";

function ProcedureInfo() {
  const [allProcedures, setAllProcedures] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { procedures, categories } = useContext(StateContext);

  const { id } = useParams();

  const logedInUser = getLoggedInUser();

  const fprocedure = allProcedures.find((procedure) => procedure._id === id);

  const { mainBackground, homeHeader } = styles;
  const { procedureBackBtn, procedureInfoPage, procedurePage, procedureInformation, procedureImage, procedureShortInfo, procedureDate, procedureTime, procedurePrice, procedureCategory, procedureButtons, registerText } = proceduresStyle;

  const handleShowDelete = () => { setShowDelete(true) };

  const handleShowEdit = () => { setShowEdit(true) };

  const handleShowRegister = () => { setShowRegister(true) };

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
          <Link to={"/procedures"}>
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
                  <p className={procedureDate}>Date: {fprocedure.date.join(" | ")}</p>
                  <p className={procedureTime}>Time: {fprocedure.time}</p>
                  <p className={procedurePrice}>Price: {fprocedure.price} €</p>
                  <p className={procedureCategory}>
                    <b>Category:</b> {getCategoryTitle(fprocedure.category)}
                  </p>
                </div>
              </div>
              {logedInUser?.data.role === "admin" ?
                <div>
                  <div className={procedureButtons}>
                    <Button
                      variant="warning"
                      className="me-3"
                      onClick={handleShowEdit}
                    >Edit</Button>
                    <Button
                      variant="light"
                      onClick={handleShowDelete}
                    >Delete</Button>
                  </div>
                  <DeleteProcedure showDelete={showDelete} setShowDelete={setShowDelete} fprocedure={fprocedure} />
                  <EditProcedure showEdit={showEdit} setShowEdit={setShowEdit} fprocedure={fprocedure} />
                </div>
                : logedInUser?.data.role === "user" ?
                  <div className={procedureButtons}>
                    <Button
                      variant="warning"
                      onClick={handleShowRegister}
                    >Register to procedure</Button>
                    <RegisterToProcedure showRegister={showRegister} setShowRegister={setShowRegister} fprocedure={fprocedure} />
                  </div>
                  :
                  <p className={registerText}>You should <Link to={"/login"} className="text-warning text-decoration-none">Log In</Link> in order to register to procedure</p>
              }
            </div>
          )}
        </div>
      </div >
    </>
  );
}

export default ProcedureInfo;
