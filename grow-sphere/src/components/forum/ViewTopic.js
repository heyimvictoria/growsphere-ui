import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import authHeader from '../../services/AuthHeader';
import AuthService from '../../services/AuthService';

export default function ViewTopic() {

    const currentUser = AuthService.getCurrentUser();

    const [topic, setTopic] = useState([]);
    const [posts, setPosts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadTopic();
    }, []);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadTopic() {
        let response = await axios.get(`http://localhost:8081/forum/topic/${id}`, {
            headers: authHeader()
        });
        let garden = response.data;
        setTopic(garden);
    }

    async function loadPosts() {
        let response = await axios.get(`http://localhost:8081/forum/topic/${id}/posts`, {
            headers: authHeader()
        });
        let store = response.data;
        setPosts(store);
    }

  return (
    <div>
        <div>
            {topic.title}
        </div>
    </div>
  )
}
