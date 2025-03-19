import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import Logo from "./Logo";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Logo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <Card.Body>
            <div className="text-center mb-3">
              <Logo width="100px" />
            </div>
            <h2 className="text-center">Sign up to create an account</h2>
            <p className="text-center text-muted">
              Already have an account?&nbsp;
              <Link to="/login" className="text-primary">Sign In</Link>
            </p>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form onSubmit={handleSubmit(create)}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: true })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Invalid email address",
                    },
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">Create Account</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;