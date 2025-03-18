import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    return <p className="text-center text-xl">Loading Summary...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Test Summary</h1>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={question.$id} className="mb-6 p-4 border rounded">
              <p className="font-semibold">{index + 1}. {question.Question}</p>

              {/* Options */}
              <div className="mt-2">
                {question.Options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-2 rounded ${
                      String(option) === String(question.CorrectAnswer)  
                        ? "bg-green-200" // Highlight correct answer
                        : String(option) === String(question.Anwsered) 
                        ? "bg-red-200" // Highlight incorrect user answer
                        : "bg-gray-100"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {/* Correct and Selected Answer */}
              <p className="text-green-600 font-semibold mt-2">
                ✅ Correct Answer: {String(question.CorrectAnswer)}
              </p>
              <p
                className={`font-bold mt-1 ${
                  String(question.CorrectAnswer) === String(question.Anwsered)
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {String(question.CorrectAnswer) === String(question.Anwsered)
                  ? "✔ You got it right!"
                  : `❌ Your Answer: ${question.Anwsered || "Not Answered"}`}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestSummary;
