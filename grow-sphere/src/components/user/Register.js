import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { username, email, password, confirmPassword } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/user', user);
        navigate('/');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h2>Register</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <label htmlFor='Username'>
                                Username:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Enter a username' name='username' value={username} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='Email'>
                                Email:
                            </label>
                            <input type={'email'} className='form-control' placeholder='Enter a valid email' name='email' value={email} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='Password'>
                                Password:
                            </label>
                            <input type={'password'} className='form-control' placeholder='Enter a password' name='password' value={password} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='ConfirmPassword'>
                                Confirm Password:
                            </label>
                            <input type={'password'} className='form-control' placeholder='Re-enter password' name='confirmPassword' value={confirmPassword} onChange={(e) => onInputChange(e)} />

                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-success'>Register</button>
                            <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>

                        </div>
                    </form>

                </div>

            </div>
        </div>
        
        // <div className='container'>
        //     <div className='row'>
        //         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        //             <h2 className='text-center m-4'>Register User</h2>
        //             <form onSubmit={(e) => onSubmit(e)}>
        //                 <div className='mb-3'>
        //                     <label htmlFor='Name' className='form-label'>
        //                         Username
        //                     </label>
        //                     <input
        //                         type={'text'}
        //                         className=' form-control'
        //                         placeholder='Enter your username'
        //                         name='username'
        //                         value={username}
        //                         onChange={(e) => onInputChange(e)} />
        //                 </div>
        //                 <div className='mb-3'>
        //                     <label htmlFor='Email' className='form-label'>
        //                         Email
        //                     </label>
        //                     <input
        //                         type={'text'}
        //                         className='form-control'
        //                         placeholder='Enter your email'
        //                         name='email'
        //                         value={email}
        //                         onChange={(e) => onInputChange(e)} />
        //                 </div>
        //                 <button type='submit' className='btn btn-outline-primary'>Submit</button>
        //                 <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    )
}
