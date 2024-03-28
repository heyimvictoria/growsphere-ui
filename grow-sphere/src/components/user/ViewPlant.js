import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewPlant() {


    const[plant, setPlant] = useState({
        commonName: "",
        scientificName: "",
        plantType: "",
        waterRequirements: "",
        sow: "",
        harvest: "",
        exposure: "",
        phLevel: "",
        fertilizer: ""
    });

    const {id} = useParams();

    useEffect(() => {
        loadPlant();
    });

    const loadPlant = async () => {
        const result = await axios.get(`http://localhost:8080/plant/${id}`);
        setPlant(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>View Plant</h2>
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
                                <b>Watering Requirements: </b>
                                {plant.waterRequirements}
                            </li>
                            <li className='list-group-item'>
                                <b>Sow Date: </b>
                                {plant.sow}
                            </li>
                            <li className='list-group-item'>
                                <b>Harvest Date: </b>
                                {plant.harvest}
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
                                <b>Fertilizer: </b>
                                {plant.fertilizer}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-secondary my-2' to={"/my-plants"}>Back to My Plants</Link>
            </div>
        </div>
    </div>
  )
}
