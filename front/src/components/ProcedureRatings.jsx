import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Form from "react-bootstrap/Form";
import styles from "../styles/ProcedureInfo.module.css";
import Button from "react-bootstrap/Button";
import { Controller, useForm } from "react-hook-form"
import { updateMyData } from "../services/update";

function ProcdureRatings({ procedure }) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const { setUpdate } = useContext(StateContext);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            comment: "",
            rating: 4,
        },
    });

    const formSubmitHandler = async (data) => {
        try {
            await updateMyData(procedure._id, data);
            reset();
            setUpdate((update) => update + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const { procedurenComment } = styles;

    return (
        <div>
            <h4 className="text-light text-center mt-2">Rate Procedure</h4>
            <Form onSubmit={handleSubmit(formSubmitHandler)}>
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: "1.5rem"
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                // value={ratingsAverage}
                                {...field}
                                value={field.value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    // field.onChange(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" sx={{ color: "white" }}
                                />}
                            />
                        </Box>
                    )}
                    rules={{ required: true }}
                />
                {errors.rating && (
                    <p className="text-danger">Rating is required.</p>
                )}

                <Form.Group
                    controlId="exampleForm.ControlInput2"
                    className={procedurenComment}>
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                {...field}
                                as="textarea"
                                rows={3}
                                placeholder="Write your comment.."
                                isInvalid={errors.comment}
                            />
                        )}
                        rules={{ required: true }}
                    />
                    {errors.comment && (
                        <Form.Control.Feedback type="invalid">
                            This field is required.
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Button variant="warning" className="ms-3 mt-3" type="submit">Comment</Button>
            </Form>
        </div>

    );
}

export default ProcdureRatings;