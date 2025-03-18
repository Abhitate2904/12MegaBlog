import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";

function TestPage() {
  const { testid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer

  useEffect(() => {
    if (testid) {
      console.log("Test ID:", testid);
      appwriteService
        .getTestQuestions()
        .then((fetchedQuestions) => {
          if (fetchedQuestions) {
            const filteredTests = fetchedQuestions.filter(test => {
                     
                return test.tests?.$id == testid; // Ensure both are the same type
            });
            console.log("Fetched Questions:", fetchedQuestions);
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

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleSubmit = async () => {
    try {
          
        // Loop through all answered questions
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
    return <p className="text-center text-xl">Loading Questions...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      {/* Warning Message */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
        <strong>Important:</strong> You cannot exit the test once it starts.
        Please complete the test before leaving.
      </div>

      {/* Timer */}
      <div className="text-center text-lg font-semibold text-red-600 mb-4">
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>

      {/* Questions Section */}
      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions available.</p>
      ) : (
        <div>
          <p className="font-semibold mb-4">
            {currentQuestion + 1}. {questions[currentQuestion].Question}
          </p>
          <div className="mt-2">
            {questions[currentQuestion].Options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id={`${questions[currentQuestion].$id}-${index}`}
                  name={questions[currentQuestion].$id}
                  checked={
                    selectedAnswers[questions[currentQuestion].$id] === option
                  }
                  onChange={() =>
                    handleOptionChange(questions[currentQuestion].$id, option)
                  }
                />
                <label htmlFor={`${questions[currentQuestion].$id}-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default TestPage;
