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
        const topicId = id;

    useEffect(() => {
        loadTopic();
    }, []);

    useEffect(() => {
        loadPosts();
    }, {});

    async function loadTopic() {
        let response = await axios.get(`http://localhost:8081/forum/topic/${id}`, {
            headers: authHeader()
        })
        .then(res => {
            console.log(res.data);
            setTopic(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    async function loadPosts(topicId) {
        let response = await axios.get('http://localhost:8081/forum/posts/topic', {
            params: {
                topicId: {topicId}
            }
        }, {
            headers: authHeader()
        })
        .then(res => {
            console.log(res.data);
            setPosts(res.data);
        })
        .catch((error) => {
            console.error(error);
            console.log(topicId);
        });
    }

  return (
    <div>
        <div className='container text-left'>
            <h3 className='forum-header text-left'>{topic.title}</h3>
        </div>
        <div className='container border border-dark rounded forum-header'>
            <div className='text-left'>
                <p className='forum-contents'>
                    {topic.creationDate} User says:
                </p>
                <p className='forum-contents'>
                    {topic.content}
                </p>
            </div>
            <div className='container border border-dark rounded forum-contents'>Replies:
                {posts.map((post, index) => {
                    <div className='container border border-dark rounded forum-contents' key={index}>
                        {post.content}
                    </div>
                })}
            </div>
        </div>
        <form className='p-3'>
            <textarea className='rounded' rows={4} cols={30}/>
            <button className='btn btn-outline-success'>Reply</button>
        </form>
    </div>
  )
}
