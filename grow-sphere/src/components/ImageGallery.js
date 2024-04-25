import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

// npm i firebase //


function ImageGallery () {

    //
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]) // create state to keep track / list of urls for each image uploded

    const imageListRef = ref(storage, "images/");
    const uploadImage = () => {
        if (imageUpload == null) return; // don't select image if empty//

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); // passing into storage folder// set name of image 
        uploadBytes(imageRef, imageUpload).then((snapshot) => {                         // no two files have same name when uploaded //
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
        <h1>Image Gallery</h1>
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