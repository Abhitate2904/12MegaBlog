import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/login');
    });
  };

  return (
    <Button
      variant="danger"
      className="px-4 py-2 fw-bold shadow-sm"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
