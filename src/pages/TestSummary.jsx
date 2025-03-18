import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";

function TestSummary() {
    const { testid } = useParams();
    const navigate = useNavigate();
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const testData = await appwriteService.getAllTest();
                if (testData.Status === "Completed" && testData.summary) {
                    setSummary(testData.summary);
                } else {
                    navigate("/"); // Redirect if test is not completed
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching test summary:", error);
                navigate("/");
            }
        };

        fetchSummary();
    }, [testid, navigate]);

    if (loading) return <p className="text-center text-xl">Loading Summary...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
            <h1 className="text-2xl font-bold text-center mb-4">Test Summary</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Question</th>
                        <th className="border p-2">Your Answer</th>
                        <th className="border p-2">Correct Answer</th>
                        <th className="border p-2">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map((q, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{q.questionText}</td>
                            <td className="border p-2">{q.userAnswer}</td>
                            <td className="border p-2">{q.correctAnswer}</td>
                            <td className="border p-2">
                                {q.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TestSummary;
