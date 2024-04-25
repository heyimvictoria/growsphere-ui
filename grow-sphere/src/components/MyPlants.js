import React, { useEffect, useState } from 'react'
import AuthService from '../services/AuthService';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../services/AuthHeader';

export default function MyPlants() {

  let redirect = null;
  let userReady = false;
  let currentUser = { username: "" };
  
  const currentUserInfo = AuthService.getCurrentUser();

  if (!currentUserInfo) {redirect = "/home"}
  userReady = true;
  currentUser = { currentUserInfo };

  const userId = currentUserInfo.id;

  const [plants, setPlants] = useState([]);

  const { plantId } = useParams();

  useEffect(() => {
    loadPlants();
  }, []);

  async function loadPlants() {
    let response = await axios.get(`http://localhost:8081/users/${userId}/plants`, {
          headers: authHeader()
        });
        let garden = response.data;
        setPlants(garden);
        console.log(plants);
  }

  const deletePlant = async (plantId) => {
    await axios.delete(`http://localhost:8081/user/${userId}/plant/${plantId}`, {
      headers: authHeader()
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
    });
    loadPlants();
  }

  if (redirect != null) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <h3>Garden</h3>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='column'>ID</th>
              <th scope='column'>Plant</th>
              <th scope='column'>Plant Type</th>
              <th scope='column'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              plants.map((plant, index) => (
                <tr>
                  <th scope='row' key={index}>{index + 1}</th>
                  <td>{plant.commonName}</td>
                  <td>{plant.plantType}</td>
                  <td>
                    <Link className='btn btn-outline-success mx-2' to={`/my-plant/${plant.id}`}>View</Link>
                    <button className='btn btn-outline-primary mx-2'>Water</button>
                    <button className='btn btn-outline-danger mx-2' onClick={() => deletePlant(plant.id)}>Remove</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className='fab-container'>
          <div className='fab shadow'>
            <div className='fab content'>
              <Link className='btn plus-circle' to={'/add-plants'}>Add<br/>Plant</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
