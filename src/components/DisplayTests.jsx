import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisplayTests({ $id, TestID, Name, Score, Status }) {
  const navigate = useNavigate();

  // Define colors based on status
  const cardStyles = {
    Completed: {
      background: "linear-gradient(135deg, #4CAF50, #81C784)", // Green for completed
      border: "2px solid #388E3C",
    },
    NotAttempted: {
      background: "linear-gradient(135deg, #FF9800, #FFB74D)", // Orange for pending
      border: "2px solid #F57C00",
    },
    NotStarted: {
      background: "linear-gradient(135deg, #2196F3, #64B5F6)", // Blue for not started
      border: "2px solid #1976D2",
    },
  };

  return (
    <Card
      className="shadow-lg border-2 rounded-lg overflow-hidden transition-transform"
      style={{
        ...(cardStyles[Status] || cardStyles["NotStarted"]), // Default to NotStarted if Status is unknown
        color: "#333",
        cursor: "pointer",
        minHeight: "180px",
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
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
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
