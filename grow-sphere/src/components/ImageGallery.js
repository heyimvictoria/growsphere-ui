import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { uploadBytes, getDownloadURL, listAll} from "firebase/storage";
import { ref } from "firebase/storage";
import { v4 } from "uuid";

function ImageGallery () {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([])

    const imageListRef = ref();
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref();
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref()).then((url) => {
                setImageList((prev) => [...prev,url ])   
            })
        });

    };
    useEffect(() => {
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            });
          });
        });
      }, []);
    return (
        <div className="ImageGallery">
            <input type="file" onChange={(event) => {
                setImageUpload(event.target.files[0]);
                }}/>
            <button onClick={uploadImage}> Upload Image</button>
            {imageList.map((url) => {
                return <img src={url} />;
            })}

        </div>


    );
}
export default ImageGallery;