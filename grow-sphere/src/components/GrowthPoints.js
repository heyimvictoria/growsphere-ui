import React, {useState, useEffect} from 'react';
import axios from 'axios'

const GrowthPoints = () => {
    const [userGrowthPts, setUserGrowthPts] = useState(0);

    useEffect(() => {

        axios.get('/user/userGrowthPts')
        .then(response => {
            const {userGrowthPts} = response.data;

            setUserGrowthPts(userGrowthPts);
        })
        .catch(error =>
        console.error('Error fetching Growth Points Balance:', error));

    }, []);

    return (
        <div>
            {userGrowthPts !== null ? (
                <h2><strong>Growth Points Balance: {userGrowthPts}</strong></h2>

            ):(
    
                <p>Loading...</p>
            )}
        </div>
       
    );
    
};
export default GrowthPoints;