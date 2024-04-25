import React, { useState } from 'react';
import axios from 'axios';

const PhotoUploader = () => {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("photo", file);
        axios.post("http://localhost:8081/photo-uploader", formData, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            alert('File uploaded successfully');
        }).catch(error => {
            alert('Error uploading file');
        });
    };

    return (
        <div className="uploader">
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload} className="btn btn-primary">Upload</button>
        </div>
    );
};

export default PhotoUploader;
