import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PostCard({ title, createdAt, subjectid, description }) {
  const navigate = useNavigate();

  return (
    <Card
      className="shadow-lg border-3 rounded-lg overflow-hidden transition-transform"
      style={{
        background: "linear-gradient(135deg, #ffafbd, #ffc3a0)",
        color: "#333",
        cursor: "pointer",
        minWidth: "280px", // Ensures all cards have the same width
        maxWidth: "300px", // Prevents excessive size variation
        minHeight: "260px", // Keeps height consistent
        border: "3px solid #ff758c", // Pretty border
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={() => navigate(`/all-tests/${subjectid}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 117, 140, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Card.Body className="text-center d-flex flex-column justify-content-center">
        <Card.Title className="fw-bold" style={{ fontSize: "1.2rem" }}>
          {title}
        </Card.Title>
        <Card.Text className="small">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
