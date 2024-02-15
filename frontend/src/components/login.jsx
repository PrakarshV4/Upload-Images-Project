import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Button,Card } from 'react-bootstrap';
import '../App.css'

export default function LoginComp(){
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Card bg='light'className='card-box'>
                <Card.Title style={{textAlign:'center',fontSize:'30px'}}>Login</Card.Title><br />
                <input className='input' type="email" placeholder="Enter email" onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                <input className='input' type="password" placeholder="Enter password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <Button variant='danger'onClick={()=>{
                    axios.post('http://localhost:3000/login',{email,password})
                    .then((response)=>{
                        if(!response.data.token){
                            console.log('Token not found');
                            navigate('/login');
                        }
                        if(response.data.success==='true'){
                            localStorage.setItem('token', JSON.stringify(response.data.token));
                            navigate('/upload')
                        }
                        else{
                            alert("Login failed")
                            console.log("Login failed")
                            navigate('/login')
                        }
                    })
                }}>Enter</Button>
                <br />
                Don't have an account?<Button variant='success'onClick={()=>{
                    navigate('/signup')
                }}>Create Account</Button>
            </Card>
        </div>
    )
}