import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Alert,
  ProgressBar,
  Form,
  Modal,
} from "react-bootstrap";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function TestPage() {
  const { testid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10-minute timer
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success popup

  useEffect(() => {
    if (testid) {
      appwriteService
        .getTestQuestions()
        .then((fetchedQuestions) => {
          if (fetchedQuestions) {
            const filteredTests = fetchedQuestions.filter(
              (test) => test.tests?.$id === testid
            );
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
      // Get current user
      const user = await authService.getCurrentUser();
      if (!user) {
        alert("User not logged in. Please log in to submit the test.");
        navigate("/login");
        return;
      }

      // Create test results object
      const userID = user.$id; // User ID from Appwrite
      const testID = testid; //
      const answers = Object.entries(selectedAnswers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );
      const testResults = {
        userID,
        testID,
        answers,
      };

      console.log("Saving test results:", testResults);
      const jsonString = JSON.stringify(testResults, null, 2);
      // Create a Blob object (For Download)
      const blob = new Blob([jsonString], { type: "application/json" });
      // Create a download link
      const file = new File([blob], `test_results_${userID}_${testID}.json`, {
        type: "application/json",
      });
      console.log("file:", file);
      const uploadedFile = await appwriteService.uploadTestResultFile(file);

      //  console.log("testResults:", TestSummary);
      //await appwriteService.saveTestResults(testid, TestSummary, user.$id);
      // for (const questionId in selectedAnswers) {
      // await appwriteService.UpdateAnswers(questionId, selectedAnswers[questionId]);
      // }
      if (!uploadedFile) {
        throw new Error("File upload failed");
      }

      console.log("File uploaded successfully:", uploadedFile);

      // Save file details to the database (optional)
      await appwriteService.saveTestResults(userID, testID, uploadedFile.$id);

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/"); // Redirect to home
  };

  if (loading) {
    return <p className="text-center fs-4 fw-bold">Loading Questions...</p>;
  }

  return (
    <Container className="mt-4">
      {/* Warning Message */}
      <Alert variant="danger" className="text-center">
        <strong>Important:</strong> You cannot exit the test once it starts.
        Please complete the test before leaving.
      </Alert>

      {/* Timer */}
      <div className="text-center mb-4">
        <h5
          className={`fw-bold ${
            timeLeft > 300
              ? "text-success"
              : timeLeft > 150
              ? "text-warning"
              : "text-danger"
          }`}
        >
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </h5>

        <ProgressBar
          now={(timeLeft / 600) * 100}
          variant={
            timeLeft > 300 ? "success" : timeLeft > 150 ? "warning" : "danger"
          }
        />
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
              {questions[currentQuestion].Options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 mb-2 border rounded text-center fw-bold ${
                    selectedAnswers[questions[currentQuestion].$id] === option
                      ? "bg-primary text-white"
                      : "bg-light"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleOptionSelect(questions[currentQuestion].$id, option)
                  }
                >
                  {option}
                </div>
              ))}
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
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

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Test Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success fw-bold">
            Your test has been successfully submitted! 🎯
          </p>
          <p>
            Thank you for completing the test. You can check your results in the
            dashboard.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Go to Home 🏠
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TestPage;
