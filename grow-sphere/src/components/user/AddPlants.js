import React, { useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../services/AuthHeader';

export default function AddPlants() {

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
      let response = await axios.get('http://localhost:8081/plants', {
            headers: authHeader()
          });
          let store = response.data;
          setPlants(store);
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

    const addPlant = async (plantId) => {
      await axios.post(`http://localhost:8081/user/${userId}/plant/${plantId}`, {
        userId: {userId},
        plantId: {plantId}
      }, {
        headers: authHeader()
      })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
            console.log(userId);
            console.log(plantId);
        });
        loadPlants();
    }


    return (
        <div className='container'>
          <div className='py-4'>
            <h3>The Plant Store</h3>
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
                        <Link className='btn btn-success mx-2' to={`/viewPlant/${plant.id}`}>View</Link>
                        <button className='btn btn-outline-success mx-2' onClick={() => addPlant(plant.id)}>Add</button>
                        <button className='btn btn-outline-danger mx-2' onClick={() => deletePlant(plant.id)}>Remove</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      );
}
