import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisplayTests({ $id, TestID, Name, Score, Status }) {
  const navigate = useNavigate();

  return (
    <Card
      className="shadow-lg border-2 rounded-lg overflow-hidden transition-transform"
      style={{
        background: "linear-gradient(135deg, #ffafbd, #ffc3a0)",
        color: "#333",
        cursor: "pointer",
        minHeight: "180px",
        border: "2px solid #ff9a44",
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={() => {
        if (Status === "Completed") {
          navigate(`/test-summary/${$id}`);
        } else {
          navigate(`/test/${$id}`);
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(238, 74, 14, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Card.Body className="text-center d-flex flex-column justify-content-center">
        <Card.Title className="fw-bold" style={{ fontSize: "1.2rem" }}>
          {Name}
        </Card.Title>
        <Card.Text className="small fw-semibold">{Status}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DisplayTests;
