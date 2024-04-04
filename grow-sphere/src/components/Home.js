<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users,setUsers]=useState([]);

    const {id} = useParams();

    useEffect(() => {
      loadUsers();

    },[]);

    const loadUsers=async() => {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    }

    const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8080/user/${id}`)
      loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
      users.map((user, index) => (
        <tr>
          <th scope="row" key={index}>{index + 1}</th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <Link className='btn btn-primary mx-2' to={`/viewUser/${user.id}`}>View</Link>
            <Link className='btn btn-outline-primary mx-2' to={`/editUser/${user.id}`}>Edit</Link>
            <button className='btn btn-primary mx-2' onClick={()=>deleteUser(user.id)}>Delete</button>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>
        </div>
    </div>
  )
}
=======
import React from 'react';

const Home = () => {
    return <h1>Welcome to GrowSphere</h1>;
};

export default Home;
>>>>>>> 8fd289fdb4a150bc6ee45b928198a45b3c7b2931
