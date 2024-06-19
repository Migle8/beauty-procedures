import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import styles from "../styles/Procedures.module.css";
import { Link } from "react-router-dom";

function Procedure({ procedure }) {
  const { name, price, image } = procedure;

  const { procedureCard, truncate, moreInfoBtn } = styles;

  return (
    <>
      <Card
        style={{ width: "18rem" }}
        bg="dark"
        text="light"
        border="warning border-opacity-50"
      >
        <Card.Img variant="top" src={image} />
        <Card.Body className={procedureCard}>
          <Card.Title as="h4">{name}</Card.Title>
          <Card.Text className={truncate}>Price: {price} €</Card.Text>
          <div className={moreInfoBtn}>
            <Link to={`/${procedure._id}`}>
              <Button variant="secondary" className="w-100">More Information</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Procedure;
