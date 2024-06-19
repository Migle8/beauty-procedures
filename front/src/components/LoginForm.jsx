import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from "../utils/auth/authenticate";
import styles from "../styles/LoginForm.module.css";

function LoginForm() {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(values) {
        try {
            await login(values);
            navigate("/procedures");
        } catch (error) {
            console.log(error);
        }
    }

    const { loginBackground, loginForm, mainHeader, loginPageForm, loginText } = styles;

    return (
        <div className={loginBackground}>
            <div className={loginForm}>
                <h1 className={mainHeader}>BEAUTY SALON</h1>
                <div className={loginPageForm}>
                    <p className={loginText}>Log In to your account</p>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                className="mb-3"
                                type="email"
                                placeholder="Enter email"
                                autoComplete="email"
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                isInvalid={errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email && errors.email.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                className="mb-3"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum length should be 8 symbols",
                                    },
                                })}
                                isInvalid={errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password && errors.password.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* <div >{error}</div> */}
                        <Button className="mb-3" variant="warning" type="submit" disabled={isSubmitting}>
                            Log In
                        </Button>
                        <Link to={"/signup"} className="link-warning text-decoration-none">
                            <p className="mb-0">
                                Create new account
                            </p>
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;