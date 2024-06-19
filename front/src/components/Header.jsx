import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, getLoggedInUser } from "../utils/auth/authenticate";
import styles from "../styles/Home.module.css";

function Header() {

    const navigate = useNavigate();

    async function onLogOut() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            return error.message;
        }
    }

    const logedInUser = getLoggedInUser();

    const { userName } = styles;

    return (
        <Navbar className="position-fixed w-100 z-2" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/procedures">
                <img width="35" height="35" src="https://img.icons8.com/ios/50/scissors.png" alt="scissors"/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/procedures">All Procedures</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">
                            Procedures for Nails
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Procedures for Hair</NavDropdown.Item>
                        {logedInUser ?
                            <>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/myprocedures">My Procedures</NavDropdown.Item>
                            </>
                            :
                            null
                        }
                    </NavDropdown>
                </Nav>
                {logedInUser ?
                    <>
                        <p className={userName}>{logedInUser.data.name}</p>
                        <Button onClick={onLogOut} variant='warning'>Log Out</Button>
                    </>
                    :
                    <Link to={"/"}>
                        <Button variant="warning">Log In</Button>
                    </Link>
                }
            </Container>
        </Navbar>
    );
}

export default Header;