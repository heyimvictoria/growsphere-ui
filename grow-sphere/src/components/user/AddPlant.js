import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddPlant() {

    let navigate = useNavigate();

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

    const { commonName, scientificName, plantType, waterRequirements, sow, harvest, exposure, phLevel, fertilizer } = plant;

    const onInputChange = (e) => {
        setPlant({...plant, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/plant', plant);
        navigate('/my-plants');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h2>Add a Plant</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <label htmlFor='CommonName'>
                                Common Name:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Common name' name='commonName' value={commonName} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='ScientificName'>
                                Scientific Name:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Scientific name' name='scientificName' value={scientificName} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='PlantType'>
                                Plant Type:
                            </label>
                            <input type={'text'} className='form-control' placeholder='vegetable, fruit, herb, etc' name='plantType' value={plantType} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='WaterRequirements'>
                                WaterRequirements:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Weekly water requirements' name='waterRequirements' value={waterRequirements} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='SowDate'>
                                Sow Date:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When to sow indoors or outdoors' name='sow' value={sow} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='HarvestDate'>
                                Harvest Date:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When to harvest' name='harvest' value={harvest} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='SunExposure'>
                                Sun Exposure:
                            </label>
                            <input type={'text'} className='form-control' placeholder='full sun, part shade, etc' name='exposure' value={exposure} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='RecommendedPHLevel'>
                                Recommended Ph Level:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Ph level of the soil' name='phLevel' value={phLevel} onChange={(e) => onInputChange(e)} />
                            <label htmlFor='Fertilizer'>
                                Fertilizer:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When and what to fertilize' name='fertilizer' value={fertilizer} onChange={(e) => onInputChange(e)} />

                        </div>
                        <div>
                            <button type='submit' className='btn btn-outline-success'>Add Plant</button>
                            <Link className='btn btn-outline-danger mx-2' to='/my-plants'>Cancel</Link>

                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}
