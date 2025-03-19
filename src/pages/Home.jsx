import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "../components/PostCard";

function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    appwriteService.GetSubjects().then((subjects) => {
      if (subjects) {
        setSubjects(subjects);
      }
    });
  }, []);

  return (
    <div className="py-4">
      <Container>
        <Row className="g-4">
          {subjects.map((subject) => (
            <Col key={subject.$subjectid} xs={12} sm={6} md={4} lg={3}>
              <PostCard
                title={subject.Subject}
                createdAt={subject.$createdAt}
                subjectid={subject.$id}
                description={subject.Description}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
