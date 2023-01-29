import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const baseUrl = "http://127.0.0.1:5000/api/";

const Upload = () => {
    const [image, setImage] = useState(null);
    const data = new FormData();

    const uploadImage = () => {
        console.log(image)
        data.append("photo", image, image.name);

        console.log(data);
        if (!data.entries().next().done) {
            console.log(data);
            const req = axios.post(baseUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .catch(err => err.response.data);
            console.log(req);
            return req;
        }
    };



    useEffect(() => {
        const form = document.querySelector("form"),
            fileInput = form.querySelector(".file-input"),
            progressArea = document.querySelector(".progress-area"),
            uploadedArea = document.querySelector(".uploaded-area");

        form.addEventListener("click", () => {
            fileInput.click();
        });

        fileInput.onchange = ({ target }) => {
            let file = target.files[0];
            if (file) {
                let fileName = file.name;
                if (fileName.length >= 12) {
                    let splitName = fileName.split('.');
                    fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
                }
                uploadFile(fileName);
            }
        }

        function uploadFile(name) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "php/upload.php");
        }
        let data = new FormData(form);
    }, []);


    return (
        <div className="upload">
            <div className="wrapper">
                <header>File Uploader</header>
                <form action="#">
                    <input
                        type="file"
                        onChange={e => {
                            setImage(e.target.files[0])
                        }}
                        className="file-input"
                        name="file"
                        hidden />
                    {image && <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />}
                    {!image && <div className="browse">
                        <i className="fa-cloud-upload-alt" />
                        Browse File to Upload</div>}
                </form>
                <button onClick={uploadImage}>send</button>
            </div>
        </div>
    );
};

export default Upload;