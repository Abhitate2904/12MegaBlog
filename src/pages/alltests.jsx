import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, DisplayTests } from "../components";
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
            return test.subjects?.$id == subjectid; // Ensure both are the same type
          });

          setTests(filteredTests);
        })
        .catch((error) => console.error("Error fetching tests:", error));
    } else {
      appwriteService
        .getAllTest()
        .then((filteredTests) => {
          setTests(filteredTests);
        })
        .catch((error) => console.error("Error fetching tests:", error));
    }
  }, [subjectid]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {tests.map((test) => (
            <div key={test.TestID} className="p-2 w-1/4">
              <DisplayTests {...test} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllTest;
