import React from 'react'
import { storage } from "./index";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const Todo = () => {
    const [images, setImages] = React.useState([]);
    const [urls, setUrls] = React.useState([]);
    const [progress, setProgress] = React.useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        images.forEach((image) => {
            const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`), image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrls((prevState) => [...prevState, downloadURL]);
                    });
                }
            );
        });
    };
    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br /></div>
    )
}

export default Todo