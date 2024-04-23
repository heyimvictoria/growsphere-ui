import React, { Component, useEffect, useState } from 'react'
import AuthService from '../services/AuthService';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Container, Button, darkColors } from 'react-floating-action-button'
import axios from 'axios';
import authHeader from '../services/AuthHeader';

export default function MyPlants() {

  let redirect = null;
  let userReady = false;
  let currentUser = { username: "" };
  
  const currentUserInfo = AuthService.getCurrentUser(); // if the current user isn't logged in, we get a bunch of errors from a null currentUserInfo

  if (!currentUserInfo) {redirect = "/home"}
  userReady = true;
  currentUser = { currentUserInfo };

  const userId = currentUserInfo.id;

  const [plants, setPlants] = useState([]);

  const { plantId } = useParams();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    const result = await axios.get(`http://localhost:8081/users/${userId}/plants`, {
      headers: authHeader()
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
    });
    setPlants(result.data);
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
                    <Link className='btn btn-outline-success mx-2' to={`/viewPlant/${plant.id}`}>View</Link>
                    <button className='btn btn-outline-primary mx-2'>Water</button>
                    <button className='btn btn-outline-danger mx-2' onClick={() => deletePlant(plant.id)}>Remove</button>
                  </td>
                </tr>
              ))
            }
            <tr>
              <td></td>
              <td>{currentUserInfo.username}</td>
              <td>{currentUserInfo.email}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <Container>
            <Button
            tooltip="Add a plant"
            icon="fas fa-plus"
            styles={{backgroundColor: darkColors.green}}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

// export default class AddPlants extends Component {
//   constructor(props) {
//       super(props);

//       // Initialize state variables for this component.
//       this.state = {
//           redirect: null, // Will store the URL to redirect to if necessary.
//           userReady: false, // Indicates if the user data is ready to be displayed.
//           currentUser: { username: "" } // Initially, no user data is available.
//       };
//   }

  
//   componentDidMount() {
//     // Retrieve the current user's details from AuthService when the component mounts.
//     const currentUser = AuthService.getCurrentUser();
    
//     // If no current user data is found, set a redirect path to the home page.
//     if (!currentUser) this.setState({ redirect: "/home" });
    
//     // Update state with the current user's data and set userReady to true to indicate that the data is ready to be displayed.
//     this.setState({ currentUser: currentUser, userReady: true });

//     const [plants, setPlants] = useState([]);
//   }

//   render() {
//     return (
//       <div></div>
//     )
//   }
// }
