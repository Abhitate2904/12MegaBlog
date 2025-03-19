import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DisplayTests from "../components/DisplayTests"; // Ensure correct import
import appwriteService from "../appwrite/config";

function AllTest() {
  const [tests, setTests] = useState([]);
  const { subjectid } = useParams();

  useEffect(() => {
    if (subjectid) {
      appwriteService
        .getAllTest()
        .then((fetchedTests) => {
          const filteredTests = fetchedTests.filter((test) => {
            return test.subjects?.$id === subjectid;
          });
          setTests(filteredTests);
        })
        .catch((error) => console.error("Error fetching tests:", error));
    } else {
      appwriteService
        .getAllTest()
        .then((allTests) => setTests(allTests))
        .catch((error) => console.error("Error fetching tests:", error));
    }
  }, [subjectid]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        {tests.map((test) => (
          <Col key={test.TestID} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <DisplayTests {...test} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTest;
