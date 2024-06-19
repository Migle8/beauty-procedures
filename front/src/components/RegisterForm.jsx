import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import styles from "../styles/LoginForm.module.css";
import { signUp } from "../utils/auth/authenticate";
import { useState } from "react";

function RegisterForm() {
    const [emailExists, setEmailExists] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(values) {
        try {
            await signUp(values);
            navigate("/");
        } catch (error) {
            // console.log(error);
            if (error.message === "Request failed with status code 500")
                setEmailExists("This email already exists");
            setError(error
                // .message
                .response.data.message
                );
        }
    }

    const { loginBackground, loginForm, mainHeader, loginPageForm, signupText, signupError } = styles;

    return (
        <div className={loginBackground}>
            <div className={loginForm}>
                <h1 className={mainHeader}>BEAUTY SALON</h1>
                <div className={loginPageForm}>
                    <p className={signupText}>Create new account</p>
                    <Form onSubmit={handleSubmit(onSubmit)} className="me-2 ms-2">
                        <Form.Group controlId="formBasicUserName">
                            <Form.Control
                                className="mb-3"
                                type="name"
                                placeholder="Enter your user name"
                                autoComplete="name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                isInvalid={errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name && errors.name.message}
                            </Form.Control.Feedback>
                        </Form.Group>

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
                            {emailExists && <p className={signupError}>{emailExists}</p>}
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

                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Control
                                className="mb-3"
                                type="password"
                                placeholder="Confirm password"
                                autoComplete="confirm-password"
                                {...register("passwordConfirm", {
                                    required: "Confirm Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum length should be 8 symbols",
                                    },
                                })}
                                isInvalid={errors.passwordConfirm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirm && errors.passwordConfirm.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className="mb-3 " variant="warning" type="submit" disabled={isSubmitting}>
                            Sign Up
                        </Button>
                        <Link to={"/"} className="link-warning text-decoration-none">
                            <p className="mb-0">
                                Already have an account?
                            </p>
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;