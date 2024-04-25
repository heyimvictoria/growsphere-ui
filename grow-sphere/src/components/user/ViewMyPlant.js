import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import authHeader from '../../services/AuthHeader';

export default function ViewMyPlant() {


    const[plant, setPlant] = useState({});

    const {id} = useParams();

    useEffect(() => {
        loadPlant();
    });

    async function loadPlant() {
      let response = await axios.get(`http://localhost:8081/plant/${id}`, {
            headers: authHeader()
          });
          let garden = response.data;
          setPlant(garden);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>{plant.commonName}</h2>
                <div className='card'>
                    <div className='card-header'>
                        Details of plant id: {plant.id}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Common Name: </b>
                                {plant.commonName}
                            </li>
                            <li className='list-group-item'>
                                <b>Scientific Name: </b>
                                {plant.scientificName}
                            </li>
                            <li className='list-group-item'>
                                <b>Plant Type: </b>
                                {plant.plantType}
                            </li>
                            <li className='list-group-item'>
                                <b>Watering Frequency: </b>
                                {plant.waterFrequency}
                            </li>
                            <li className='list-group-item'>
                                <b>Watering Requirements: </b>
                                {plant.waterRequirements}
                            </li>
                            <li className='list-group-item'>
                                <b>Inside Sow Date: </b>
                                {plant.insideSowDate}
                            </li>
                            <li className='list-group-item'>
                                <b>Sow Description: </b>
                                {plant.sowDescription}
                            </li>
                            <li className='list-group-item'>
                                <b>Outside Sow Date: </b>
                                {plant.outsideSowDate}
                            </li>
                            <li className='list-group-item'>
                                <b>Harvest Date: </b>
                                {plant.harvestDate}
                            </li>
                            <li className='list-group-item'>
                                <b>Sun Exposure: </b>
                                {plant.exposure}
                            </li>
                            <li className='list-group-item'>
                                <b>Soil Ph Level: </b>
                                {plant.phLevel}
                            </li>
                            <li className='list-group-item'>
                                <b>Fertilizer Ratio: </b>
                                {plant.fertilizerRatio}
                            </li>
                            <li className='list-group-item'>
                                <b>Fertilizer Frequency: </b>
                                {plant.fertilizerFrequency}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-success my-2' to={"/plants"}>Back to My Garden</Link>
            </div>
        </div>
    </div>
  )
}