import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import styles from "../styles/Procedures.module.css";
import { Link } from "react-router-dom";

function MyProceduresCard({ procedure }) {

    const { procedureCard, truncate, moreInfoBtn } = styles;

    return (
        <>
            <Card
                style={{ width: "18rem" }}
                bg="dark"
                text="light"
                border="warning border-opacity-50"
            >
                <Card.Img variant="top" src={procedure.procedureId.image} />
                <Card.Body className={procedureCard}>
                    <Card.Title as="h4">{procedure.procedureId.name}</Card.Title>
                    <Card.Text className={truncate}>{procedure.procedureId.price} €</Card.Text>
                    <div className={moreInfoBtn}>
                        <Link to={`/myprocedures/${procedure.procedureId._id}`}>
                            <Button variant="secondary" className="w-100">More Information</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default MyProceduresCard;