import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import styles from "../styles/CreateProcedureForm.module.css";
import axios from "axios";
import { updateData } from "../services/update";
import { StateContext } from "../utils/StateContext";
import { postData } from "../services/post";

function EditProcedure({ showEdit, setShowEdit, fprocedure }) {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [dates, setDates] = useState([""]);

  const { setUpdate } = useContext(StateContext);

  const {
    createProcedure,
    createProcedureModal,
    createProcedureCloseBtn,
    createProcedureHeader,
    errorStyle,
    createProcedureButtons,
    createProcedureCancelBtn,
  } = styles;

  const addDateInput = () => {
    setDates([...dates, ""]);
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...dates];
    updatedDates[index] = value;
    setDates(updatedDates);
  };

  const removeDateInput = (index) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      date: [""],
      time: "",
      price: "",
      category: "",
    },
  });

  const formSubmitHandler = async (data) => {
    data.date = dates;
    try {
      if (fprocedure) {
        await updateData(fprocedure._id, { ...data, image: data.image[0] });
      } else {
        await postData({ ...data, image: data.image[0] });
      }
      setUpdate((update) => update + 1);
      reset();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => {
    setShowEdit(false);
    reset();
  };

  useEffect(() => {
    if (fprocedure) {
      setValue("name", fprocedure.name);
      setValue("time", fprocedure.time);
      setValue("price", fprocedure.price);
      setValue("category", fprocedure.category);
      setDates(fprocedure.date || [""]);
    }
  }, [fprocedure, setValue]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3003/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Modal
        show={showEdit}
        onHide={handleClose}
        data-bs-theme="dark"
        dialogClassName={createProcedure}
      >
        <div className={createProcedureModal}>
          <div className={createProcedureCloseBtn}>
            <CloseButton onClick={handleClose} />
          </div>
          <h1 className={createProcedureHeader}>Edit Procedure</h1>
          <Form onSubmit={handleSubmit(formSubmitHandler)}>
            <div>
              <Form.Group
                controlId="exampleForm.ControlInput1"
                className="mt-5"
              >
                <Form.Control
                  type="textarea"
                  placeholder="Procedure name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  isInvalid={errors.name}
                />
                <div className={errorStyle}>{error}</div>
                <Form.Control.Feedback type="invalid">
                  {errors.name && errors.name.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="container">
                <div className="row">
                  <Form.Group
                    className="mt-4 col ps-0"
                    controlId="exampleForm.ControlTextarea4"
                  >
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="d-flex flex-row align-items-center mb-2"
                      >
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(e) =>
                            handleDateChange(index, e.target.value)
                          }
                          isInvalid={errors.date && errors.date[index]}
                        />
                        {dates.length > 1 ? (
                          <CloseButton onClick={() => removeDateInput(index)} />
                        ) : null}
                      </div>
                    ))}
                    <input
                      type="button"
                      onClick={addDateInput}
                      value="Add date"
                    />
                    <div className={errorStyle}>{error}</div>
                    <Form.Control.Feedback type="invalid">
                      {errors.date && errors.date.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mt-4 col pe-0"
                    controlId="exampleForm.ControlTextarea5"
                  >
                    <Form.Control
                      type="time"
                      {...register("time", {
                        required: "Time is required",
                      })}
                      isInvalid={errors.time}
                    />
                    <div className={errorStyle}>{error}</div>

                    <Form.Control.Feedback type="invalid">
                      {errors.time && errors.time.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <Form.Group
                controlId="exampleForm.ControlInput6"
                className="mt-4"
              >
                <Form.Control
                  type="textarea"
                  placeholder="Price"
                  autoComplete="price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                  isInvalid={errors.price}
                />
                <div className={errorStyle}>{error}</div>
                <Form.Control.Feedback type="invalid">
                  {errors.price && errors.price.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-4">
                <Form.Control
                  type="file"
                  name="image"
                  {...register("image")}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.image && errors.image.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-4">
                <Form.Select id="excursionCategory" {...register("category")}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className={createProcedureButtons}>
              <Button
                variant="dark"
                onClick={handleClose}
                className={createProcedureCancelBtn}
              >
                <div>Cancel</div>
              </Button>
              <Button variant="warning" type="submit" disabled={isSubmitting}>
                <div>Save</div>
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default EditProcedure;
