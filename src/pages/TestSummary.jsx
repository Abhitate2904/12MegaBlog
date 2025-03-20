import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function TestSummary() {
  const { testid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queans, setQueans] = useState([]); // Stores user's selected answers

  useEffect(() => {
    async function fetchTestSummary() {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          console.error("User not logged in.");
          return;
        }

        // Fetch all questions for this test
        const fetchedQuestions = await appwriteService.getTestQuestions();
        const filteredQuestions = fetchedQuestions.filter(
          (test) => test.tests?.$id === testid
        );
        setQuestions(filteredQuestions);

        // Fetch user test results
        const results = await appwriteService.getTestResultsByUser(user.$id);
        const testResult = results.find((result) => 
          String(result?.TestId ?? "").trim().toLowerCase() === String(testid ?? "").trim().toLowerCase()
        );

        if (!testResult || !testResult.fileId) {
          console.warn("No test results found for this test.");
          setLoading(false);
          return;
        }

        // Fetch test details from the file stored in Appwrite
        const fileData = await appwriteService.getTestResultFile(testResult.fileId);
        if (!fileData) {
          console.error("Failed to retrieve test result file.");
          setLoading(false);
          return;
        }

        // Parse the JSON file content (answers)
        const testData = JSON.parse(fileData);
        setQueans(testData.answers); // User's selected answers
      } catch (error) {
        console.error("Error fetching test summary:", error);
      }
      setLoading(false);
    }

    fetchTestSummary();
  }, [testid]);

  // ✅ **Map questions with user answers**
  const mappedQuestions = questions.map((question) => {
    const userAnswer = queans.find((ans) => ans.questionId === question.$id);
    return {
      ...question,
      selectedAnswer: userAnswer ? userAnswer.selectedAnswer : "Not Answered",
    };
  });

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

      {mappedQuestions.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No test data available.
        </Alert>
      ) : (
        <div className="d-flex flex-column align-items-center gap-4">
          {mappedQuestions.map((question, index) => (
            <Card
              key={question.$id}
              className="w-100 shadow-sm border-primary border-2 rounded-3"
              style={{ maxWidth: "600px", borderLeft: "5px solid #007bff" }}
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
                          ? "bg-success text-white shadow-sm border border-dark"
                          : String(option) === String(question.selectedAnswer)
                          ? "bg-danger text-white shadow-sm border border-dark"
                          : "bg-light text-dark border border-secondary"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                {/* Correct & User Answer */}
                <div className="mt-3">
                  <span className="fw-bold text-success">
                    ✔ Correct Answer: {String(question.CorrectAnswer)}
                  </span>
                  <p
                    className={`fw-bold mt-1 ${
                      String(question.CorrectAnswer) === String(question.selectedAnswer)
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {String(question.CorrectAnswer) === String(question.selectedAnswer)
                      ? "✅ You got it right!"
                      : `❌ Your Answer: ${question.selectedAnswer || "Not Answered"}`}
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
