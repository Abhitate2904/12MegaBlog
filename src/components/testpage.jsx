import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert, ProgressBar, Form, Modal } from "react-bootstrap";
import appwriteService from "../appwrite/config";

function TestPage() {
  const { testid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10-minute timer
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false); // Modal state

  useEffect(() => {
    if (testid) {
      appwriteService
        .getTestQuestions()
        .then((fetchedQuestions) => {
          if (fetchedQuestions) {
            const filteredTests = fetchedQuestions.filter((test) => test.tests?.$id == testid);
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

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (questions.length === 0) {
      setShowNoQuestionsModal(true); // Show popup if no questions exist
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleSubmit = async () => {
    try {
      for (const questionId in selectedAnswers) {
        await appwriteService.UpdateAnswers(questionId, selectedAnswers[questionId]);
      }
      alert("Test submitted successfully!");
      navigate("/"); // Redirect to home or results page
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (loading) {
    return <p className="text-center fs-4 fw-bold">Loading Questions...</p>;
  }

  return (
    <Container className="mt-4">
      {/* Warning Message */}
      <Alert variant="danger" className="text-center">
        <strong>Important:</strong> You cannot exit the test once it starts. Please complete the test before leaving.
      </Alert>

      {/* Timer */}
      <div className="text-center mb-4">
        <h5 className="text-danger fw-bold">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</h5>
        <ProgressBar now={(timeLeft / 600) * 100} variant="danger" />
      </div>

      {/* Questions Section */}
      {questions.length === 0 ? (
        <p className="text-center text-muted">No questions available.</p>
      ) : (
        <Card className="shadow-sm p-4 border border-primary">
          <Card.Body>
            <h5 className="mb-3">
              {currentQuestion + 1}. {questions[currentQuestion].Question}
            </h5>
            <Form>
              {questions[currentQuestion].Options.map((option, index) => {
                // Check if the option is in exponential notation
                const isExponential = /^[+-]?\d+(\.\d+)?e[+-]?\d+$/i.test(option);
                const formattedOption = isExponential ? Number(option).toExponential(2) : option;

                return (
                  <div
                    key={index}
                    className={`p-3 mb-2 border rounded text-center fw-bold ${
                      selectedAnswers[questions[currentQuestion].$id] === option
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOptionSelect(questions[currentQuestion].$id, option)}
                  >
                    {formattedOption}
                  </div>
                );
              })}
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={handlePrevious} disabled={currentQuestion === 0}>
          ⬅ Previous
        </Button>
        {currentQuestion < questions.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Next ➡
          </Button>
        ) : (
          <Button variant="success" onClick={handleSubmit}>
            ✅ Submit
          </Button>
        )}
      </div>

      {/* No Questions Modal */}
      <Modal show={showNoQuestionsModal} onHide={() => setShowNoQuestionsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>⚠ No Questions Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There are no questions available for this test. Please check with your instructor or try another test.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoQuestionsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TestPage;
