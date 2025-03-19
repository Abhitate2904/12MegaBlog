import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import Logo from "./Logo";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      console.log("LOGIN"+ data);
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          const sessions = await authService.getSessions();
          if (sessions?.sessions?.length) {
            for (const oldSession of sessions.sessions) {
              if (oldSession.$id !== session.$id) {
                await authService.deleteSession(oldSession.$id);
              }
            }
          }
          dispatch(authLogin(userData));
          navigate("/");
        }
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
            <h2 className="text-center">Sign in to your account</h2>
            <p className="text-center text-muted">
              Don&apos;t have an account?&nbsp;
              <Link to="/signup" className="text-primary">Sign Up</Link>
            </p>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form onSubmit={handleSubmit(login)}>
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
              <Button type="submit" variant="primary" className="w-100">Sign in</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
