import React from 'react'
import { Row,Col,Image, Button, ListGroup } from 'react-bootstrap'
import home from '../assets/header.jpeg'
import '../assets/Styles.css'


const AdminWallet:React.FC =()=>{
    return<div>

<ListGroup >
 <ListGroup.Item className='py-2' >  

 <Row className='d-flex' >
        <Col className='d-flex justify-content-center'xs={6} lg={3}>
        <Image src ={home} className='rounded-image-size' alt='aaa' roundedCircle/>
        </Col>
    <Col className='d-flex justify-content-center align-items-center'xs={6} lg={3} >Ann Glasgow</Col>
    
    
            <Col className='py-2 d-flex justify-content-center' xs={6} lg={3}><Button>update</Button></Col>
            <Col className='py-2 d-flex justify-content-center' xs={6} lg={3}><Button>update</Button></Col>
         
        </Row>
    </ListGroup.Item> 
    </ListGroup>

    </div>
    
}
export default AdminWallet