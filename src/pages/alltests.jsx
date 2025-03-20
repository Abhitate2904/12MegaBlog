import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DisplayTests from "../components/DisplayTests"; // Ensure correct import
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function AllTest() {
  const [tests, setTests] = useState([]);
  const { subjectid } = useParams();
  const [userID, setUserID] = useState(null);
  const [testResults, setTestResults] = useState({}); // Store test results

  useEffect(() => {
    const fetchTestsAndResults = async () => {
      try {
        // Get Logged-in User ID
        const user = await authService.getCurrentUser();
        if (!user) return;
      
        console.log("user",user.$id)
       setUserID(user.$id);
       console.log("user",subjectid)
        // Fetch all tests
        const fetchedTests = await appwriteService.getAllTest();
        const filteredTests = subjectid
          ? fetchedTests.filter((test) => test.subjects?.$id === subjectid)
          : fetchedTests;
        console.log("fetchedTests",fetchedTests)
        setTests(filteredTests);

        // Fetch test results for logged-in user
        const results = await appwriteService.getTestResultsByUser(user.$id);
        const resultsMap = {};
        console.log("results",results)
        results.forEach((result) => {
          resultsMap[result.TestId
          ] = "Completed"; // Mark completed tests
        });

        setTestResults(resultsMap);
      } catch (error) {
        console.error("Error fetching tests or results:", error);
      }
    };

    fetchTestsAndResults();
  }, [subjectid]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        {tests.map((test) => (
          <Col key={test.$id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <DisplayTests
              {...test}
              Status={testResults[test.$id] || "NotAttempted"} // Update status from test results
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTest;
