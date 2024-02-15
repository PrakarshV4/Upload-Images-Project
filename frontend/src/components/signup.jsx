import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Button,Card } from 'react-bootstrap';
import '../App.css'

export default function SignupComp(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Card bg='light'className='card-box'>
                <Card.Title style={{textAlign:'center',fontSize:'30px'}}>Sign Up</Card.Title>
                <br />
                <input className='input'type="text" placeholder="Name" onChange={(e)=>{
                    setName(e.target.value);
                }}/>
                <input className='input' type="email" placeholder="Email Address" onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                <input className='input' type="password" placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <Button variant='danger'onClick={()=>{
                    axios.post('http://localhost:3000/signup',{name,email,password})
                    .then((response)=>{
                        if(response.data.success==='true'){
                            navigate('/login')
                        }else{
                            navigate('/signup')
                            alert("Signup failed")
                            console.log("Signup failed")
                        }
                    })
                }}>Create Account</Button>
                <br />
                Already have an account?<Button onClick={()=>{
                     navigate('/login')
                }}>Login</Button>
            </Card>     
        </div>
    )
}