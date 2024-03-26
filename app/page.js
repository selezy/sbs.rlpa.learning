import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';


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
}