import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function MyPlants() {

    const [plants, setPlants] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadPlants();
    }, []);

    const loadPlants = async () => {
        const result = await axios.get('http://localhost:8080/plants');
        setPlants(result.data);
    }

    const deletePlant = async (id) => {
        await axios.delete(`http://localhost:8080/plant/${id}`);
        loadPlants();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Plant</th>
                            <th scope="col">Scientific Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            plants.map((plant, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{plant.commonName}</td>
                                    <td>{plant.scientificName}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2' to={`/viewPlant/${plant.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/editPlant/${plant.id}`}>Edit</Link>
                                        <button className='btn btn-primary mx-2' onClick={() => deletePlant(plant.id)}>Delete</button>
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
