import React, { useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../services/AuthHeader';

export default function ForumHome() {

    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;

    const [topics, setTopics] = useState([]);

    const { topicId } = useParams();

    useEffect(() => {
        loadTopics();
    }, []);
  
    async function loadTopics() {
      let response = await axios.get('http://localhost:8081/forum/topics', {
            headers: authHeader()
          });
          let store = response.data;
          console.log(store);
          setTopics(store);
    }

    const addTopic = async (newTopic) => {
        await axios.post('http://localhost:8081/forum/topic/new', {
            newTopic
        }, {
            headers:authHeader()
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        loadTopics();
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <div className='mb-3'>
                <h3>Forum</h3>
                <Link className='btn btn-success' to={'/forum/topic/new'}>New Topic</Link>

            </div>
            <table className='table border shadow'>
                <thead>
                    <tr>
                        <th scope='column'>ID</th>
                        <th scope='column'>Title</th>
                        <th scope='column'>Views</th>
                        <th scope='column'>Created</th>
                        <th scope='column'>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topics.map((topic, index) => (
                            <tr>
                                <th scope='row' key={index}>{index + 1}</th>
                                <td>
                                    <Link to={`/forum/topic/${topic.id}`}>{topic.title}</Link>
                                </td>
                                <td>{topic.views}</td>
                                <td>{topic.creationDate}</td>
                                <td>{topic.lastUpdateDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
