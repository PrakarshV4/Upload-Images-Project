import { useEffect,useState,useRef } from "react"
import axios from "axios"
import { Button, Card} from 'react-bootstrap';
import '../App.css'

export default function UploadComp(){
    const [file,setFile] = useState();
    const [image,setImage] = useState([]);
      
    const handleUpload = (e)=>{
        const token = localStorage.getItem('token');
        console.log('upload token = '+token)
        e.preventDefault();
        const formData = new FormData();  
        formData.append('file',file);
        axios.post('http://localhost:3000/upload' ,formData,
           {
            headers: {
                'Authorization': token,
                "Content-Type": "multipart/form-data"
            }
            }
        )
        .then((res)=>{
            console.log("resdataimage = "+res.data.image);
            setImage(res.data.image);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
            axios.get('http://localhost:3000/getImage')
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{console.log(err)})
    },[])
    const keys = useRef(1);
    return (
        <div>
            <div>
                <h1>Upload</h1>
                <br />
                <input type="file" onChange={(e)=>{
                    setFile(e.target.files[0]);
                }} /> 
                <br /><br />
                <Button onClick={handleUpload}>Upload</Button>
            <br /><br />
            </div>
            <div>
            <h2>Uploaded Image</h2><br />
                {image.map((photo) =>{
                    keys.current += 1;
                    return (
                        <img key={keys.current} style={{ maxWidth: '50%', maxHeight: '100%', width: 'auto', height: 'auto' }} src={`http://localhost:3000/Images/`+photo} alt="" />
                    )
                })}
            </div>
        </div>
    )
}