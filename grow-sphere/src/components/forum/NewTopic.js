import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService';
import authHeader from '../../services/AuthHeader';

export default function NewTopic() {

    let navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const[topic, setTopic] = useState({
        user: currentUser,
        title: "",
        content: "",
        closed: false
    });

    const { user, title, content, closed } = topic;

    const onInputChange = (e) => {
        setTopic({...topic, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8081/forum/topic/new', {
            topic: {topic}
        }, {
            headers: authHeader()
        });
        navigate('/forum');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h2>Create a New Discussion Topic</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <label htmlFor='Title'>
                                Title:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Topic title' name='title' value={title} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='Content'>
                                Content:
                            </label>
                            <textarea type={'text'} className='form-control' placeholder='Content' name='content' value={content} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-success'>Add Topic</button>
                            <Link className='btn btn-outline-danger mx-2' to='/forum'>Cancel</Link>

                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}