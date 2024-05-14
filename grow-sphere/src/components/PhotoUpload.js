import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../services/AuthHeader";

// Function to clean any string data if necessary
const cleanString = (str) => {
    if (!str || typeof str !== 'string') {
        return ''; // Return empty if undefined or not a string
    }
    return str.replace(/^"|"$|\\"/g, '').trim(); // Clean leading/trailing double quotes
};

function ImageUploaderAndGallery() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []); // The empty dependency array means this effect runs once on mount

    const fetchImages = () => {
        setLoading(true);
        axios.get('http://localhost:8080/api/files', { headers: authHeader() })
            .then(response => {
                const cleanedImages = response.data.map(img => ({
                    ...img,
                    filename: cleanString(img.filename)
                }));
                setImages(cleanedImages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching files', error);
                setLoading(false);
            });
    };

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        axios.post("http://localhost:8080/api/upload", formData, {
            headers: authHeader()
        })
            .then(response => {
                alert('File uploaded successfully');
                fetchImages();  // Refresh the gallery after upload
                setLoading(false);
            })
            .catch(error => {
                alert('Error uploading file: ' + error.message);
                console.error('Upload error', error);
                setLoading(false);
            });
    };

    const onDelete = (id) => {
        setLoading(true);
        axios.delete(`http://localhost:8080/api/files/${id}`, {
            headers: authHeader()
        })
            .then(response => {
                alert('File deleted successfully');
                fetchImages();  // Refresh the gallery after deletion
                setLoading(false);
            })
            .catch(error => {
                alert('Error deleting file: ' + error.message);
                console.error('Deletion error', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Upload a Photo</h2>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload} disabled={loading}>Upload!</button>

            <h2>Image Gallery</h2>
            {loading ? <p>Loading...</p> : images.map(image => (
                <div key={image.id}>
                    <img src={`http://localhost:8080/api/files/${image.filename}`} alt={image.filename} style={{width: "100px"}} />
                    <button onClick={() => onDelete(image.id)} disabled={loading}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ImageUploaderAndGallery;
