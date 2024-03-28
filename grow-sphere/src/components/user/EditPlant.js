import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditPlant() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [plant, setPlant] = useState({
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
        setPlant({ ...plant, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadPlant();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/plant/${id}`, plant);
        navigate('/my-plants');
    };

    const loadPlant = async () => {
        const result = await axios.get(`http://localhost:8080/plant/${id}`);
        setPlant(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Plant</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='CommonName' className='form-label'>
                                Common Name:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Common name' name='commonName' value={commonName} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='ScientificName' className='form-label'>
                                Scientific Name:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Scientific name' name='scientificName' value={scientificName} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='PlantType'>
                                Plant Type:
                            </label>
                            <input type={'text'} className='form-control' placeholder='vegetable, fruit, herb, etc' name='plantType' value={plantType} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='WaterRequirements'>
                                WaterRequirements:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Weekly water requirements' name='waterRequirements' value={waterRequirements} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='SowDate'>
                                Sow Date:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When to sow indoors or outdoors' name='sow' value={sow} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='HarvestDate'>
                                Harvest Date:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When to harvest' name='harvest' value={harvest} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='SunExposure'>
                                Sun Exposure:
                            </label>
                            <input type={'text'} className='form-control' placeholder='full sun, part shade, etc' name='exposure' value={exposure} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='RecommendedPHLevel'>
                                Recommended Ph Level:
                            </label>
                            <input type={'text'} className='form-control' placeholder='Ph level of the soil' name='phLevel' value={phLevel} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Fertilizer'>
                                Fertilizer:
                            </label>
                            <input type={'text'} className='form-control' placeholder='When and what to fertilize' name='fertilizer' value={fertilizer} onChange={(e) => onInputChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to='/my-plants'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
