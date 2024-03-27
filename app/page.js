'use client'
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, CardBody, CardTitle, CardText, Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const url = 'https://jsonplaceholder.typicode.com/posts';

export default function Home() {
  const [posts, setPostData] = useState([]);
  const [loading, setLoadingStatus] = useState(false);
  const [error, setPostError] = useState(null);

  const fetchData = async () => {
    setLoadingStatus(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setPostData(data);
      setLoadingStatus(false);
    } catch (error) {
      setPostError(error.message);
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="my-5">Post Data</h1>
      <Button className="mb-3" color="primary" onClick={() => fetchData()} disabled={loading}>
        {loading ? <Spinner size="lg" /> : 'Fetch Data'}
      </Button>
      {error && <div className="text-danger">{error}</div>}
      <Row>
        {posts.map(post => (
          <Col key={post.id} md="4" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{post.title}</CardTitle>
                <CardText>{post.body}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}