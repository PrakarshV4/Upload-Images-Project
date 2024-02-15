import { useEffect,useState } from "react"
import axios from "axios"
import { Button, Card} from 'react-bootstrap';
import '../App.css'

export default function UploadComp(){
    const [file,setFile] = useState();
    const [image,setImage] = useState();

      
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
            console.log(res.data);
            setImage(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
            axios.get('http://localhost:3000/getImage')
            .then((res)=>{
                console.log(image)
                console.log(res);
            })
            .catch((err)=>{console.log(err)})
    },[])

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
                <img style={{ maxWidth: '50%', maxHeight: '100%', width: 'auto', height: 'auto' }} src={`http://localhost:3000/Images/`+image} alt="" />
            </div>
        </div>
    )
}