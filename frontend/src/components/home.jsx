import {useNavigate} from 'react-router-dom'
import { Button,Card } from 'react-bootstrap';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function HomeComp(){
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card bg='light'className='card-box'>
                <Card.Body>
                    <Card.Title style={{textAlign:'center',fontSize:'30px'}}>Image Uploader</Card.Title>
                    <br />
                    <Button className="equalButtons" variant="danger"onClick={()=>{
                        navigate('/login');
                    }}>Already a User?</Button>
                    <Button  className="equalButtons" variant="primary"onClick={()=>{
                        navigate('/signup');
                    }}>New User</Button>
                </Card.Body>
            </Card>  
        </div>
    )
}