import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

// npm i firebase //


function ImageGallery () {

    // add notes here
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([])

    // add notes here
    const imageListRef = ref(storage, "images/");
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev,url ])   
            })
        });

    };
    // show the images previously uploaded
    useEffect(() => {
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            });
          });
        });
      }, []);
      // onClick method to upload image to page and storage file
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