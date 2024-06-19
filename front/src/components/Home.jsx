import Button from "react-bootstrap/Button";
import CreateProcedureForm from "./CreateProcedureForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import ProcedureList from "./ProcedureList";
import { getLoggedInUser } from "../utils/auth/authenticate";

function Home() {
  const { handleShow } = useContext(StateContext);

  const { mainBackground, homeCreateBtn, homePage, homeHeader } = styles;

  const logedInUser = getLoggedInUser();

  return (
    <>
      <div className={mainBackground}>
        <div className={homePage}>
          <h1 className={homeHeader}>BEAUTY SALON</h1>
          {logedInUser?.data.role === "admin" ?
            <>
              <Button
                onClick={handleShow}
                variant="warning"
                className={homeCreateBtn}
              >
                Create new Procedure
              </Button>
              <CreateProcedureForm />
            </>
            :
            null
          }
        </div>
        <ProcedureList />
      </div>
    </>
  );
}

export default Home;
