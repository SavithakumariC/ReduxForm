import React from "react";
import "./Form.css";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fName: yup.string().required("First Name is required"),
  lName: yup.string().required("Last Name is required"),
  email: yup.string().email("Pls enter valid email").required("Enter Email"),
  age: yup
    .number()
    .positive("Enter ur age")
    .required()
    .min(18, "Age must be 18+"),

  password: yup
    .string()
    .required()
    .min(4, "Minimum 4 characters needed")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "pwd must contain atleast one spl char & one caps"
    )
    .max(18, "Maximum upto 18 characters"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
const Validation = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = form;
  console.log(isDirty);
  console.log(isValid);

  return (
    <Container className="form">
      <h4 className="h4">Form Validation Using useForm</h4>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>Firstname</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="text"
              className="firstName"
              {...register("fName")}
              placeholder="Enter your Firstname"
            />
            <Row>
              <p className="errors">{errors.fName?.message}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>LastName</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="text"
              className="lastName"
              {...register("lName")}
              placeholder="Enter your Lastname"
            />
            <Row>
              <p className="errors">{errors.lName?.message}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>Email</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="email"
              className="email"
              {...register("email")}
              placeholder="pls enter ur email"
            />
            <Row>
              <p className="errors">{errors.email?.message}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>Upload Image</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input type="file" accept="image/*" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>Age</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="age"
              className="age"
              {...register("age")}
              placeholder="Enter ur age"
            />

            <Row>
              {errors.age && errors.age.type === "min" && (
                <p className="errors">Age must be 18 or above</p>
              )}
            </Row>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label>Password</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="password"
              {...register("password")}
              placeholder="password"
            />
            <Row>
              <p className="errors">{errors.password?.message}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={5} md={4} sm={3} xs={3} className="label">
            <label> Re-enter Password</label>
          </Col>
          <Col xl={7} lg={7} md={8} sm={9} xs={9}>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Re-enter password"
            />
            <Row>
              <p className="errors">{errors.confirmPassword?.message}</p>
            </Row>
          </Col>
        </Row>
        <Row lg={12}>
          <button className="button" disabled={isDirty && !isValid}>
            Submit
          </button>
        </Row>
      </form>
    </Container>
  );
};
export default Validation;
