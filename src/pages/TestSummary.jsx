import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import appwriteService from "../appwrite/config";

function TestSummary() {
  const { testid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testid) {
      console.log("Test ID:", testid);
      appwriteService
        .getTestQuestions()
        .then((fetchedQuestions) => {
          if (fetchedQuestions) {
            const filteredTests = fetchedQuestions.filter(
              (test) => test.tests?.$id === testid
            );
            console.log("Filtered Questions:", filteredTests);
            setQuestions(filteredTests);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    }
  }, [testid]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Fetching test summary...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center text-dark fw-bold mb-4">Test Summary</h2>

      {questions.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No test data available.
        </Alert>
      ) : (
        <div className="d-flex flex-column align-items-center gap-4">
          {questions.map((question, index) => (
            <Card
              key={question.$id}
              className="w-100 shadow-sm border-primary border-2 rounded-3"
              style={{ maxWidth: "600px", borderLeft: "5px solid #007bff" }} // Added border-left styling
            >
              <Card.Body>
                <h5 className="fw-bold mb-3 text-primary">
                  {index + 1}. {question.Question}
                </h5>

                {/* Options */}
                <div className="d-flex flex-column gap-2">
                  {question.Options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 text-center rounded fw-semibold ${
                        String(option) === String(question.CorrectAnswer)
                          ? "bg-success text-white shadow-sm border border-dark" // Correct Answer
                          : String(option) === String(question.Anwsered)
                          ? "bg-danger text-white shadow-sm border border-dark" // Incorrect Answer
                          : "bg-light text-dark border border-secondary"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                {/* Correct & User Answer */}
                <div className="mt-3">
                  <span className="fw-bold text-success">✔ Correct Answer: {String(question.CorrectAnswer)}</span>
                  <p
                    className={`fw-bold mt-1 ${
                      String(question.CorrectAnswer) === String(question.Anwsered)
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {String(question.CorrectAnswer) === String(question.Anwsered)
                      ? "✅ You got it right!"
                      : `❌ Your Answer: ${question.Anwsered || "Not Answered"}`}
                  </p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default TestSummary;
