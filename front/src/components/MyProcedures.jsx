import styles from "../styles/Home.module.css";
import MyProceduresList from "./MyProceduresList";

function MyProcedures() {
    const { mainBackground, homePage, homeHeader } = styles;

    return ( 
        <>
        <div className={mainBackground}>
          <div className={homePage}>
            <h1 className={homeHeader}>MY PROCEDURES</h1>
              <>
                <MyProceduresList />
              </>
          </div>
        </div>
      </>
     );
}

export default MyProcedures;