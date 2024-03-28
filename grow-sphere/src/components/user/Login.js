import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/user', user);
        navigate('/');
    };

  return (
    <div className="login-container">
        <h2>Login</h2>
        <form>
            <label>
                Email:
                <input type='email' className='form-control' name='email' value={user.email} />
            </label>
            <label>
                Password:
                <input type='password' className='form-control' name='password' value={user.password} />
            </label>
            <button type='submit'>Login</button>
        </form>
    </div>
  );
}
