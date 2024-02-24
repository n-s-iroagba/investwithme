import React from 'react'
import { Row,Col,Card,Image} from 'react-bootstrap'
import '../assets/Styles.css'
import home1 from '../assets/home1.jpeg'
import { GetStartedButton } from '../components/Button'

const InvestmentManagers:React.FC = () => {
    return<div className='text-light primary-background pb-3 px-3'>
        <div className='  py-3 text-center  mt-0'><h2 >Please select an investment manager to proceed with your deposit.</h2></div>
      <Card className=' text-light px-1.5 card-background card'>
      <Card.Body>
        <Row className='justify-content-start border-bottom border-white align-items-center pt-3'>
          <Col >
            <div>
              <Image src={home1} alt="Card Image" roundedCircle  className='rounded-image-size' />
            </div>
          </Col>
          <Col>
            <Card.Title className='ms-0'>< h6>160%</h6>RETURN<h6>ON</h6><h6>INVESTMENT</h6></Card.Title>
          </Col>
        </Row>
        <div className='d-flex flex-column align-items-center'>
        <div className='py-3 '>
       <Card.Title className='d-flex align-items-center  mb-0'><p className='card-label-width' >Name:</p> <p >Ann Glasgow</p></Card.Title>
       <Card.Text className='d-flex  align-items-center  mb-0'><p className='card-label-width' >Minimum Amount:</p> <p >$1,600</p></Card.Text>
       <Card.Text className='d-flex align-items-center  mb-0'><p className='card-label-width' >Maximum Amount:</p> <p >$6,000</p></Card.Text>
       <Card.Text className='d-flex align-items-center  mb-0'><p className='card-label-width' >Duration:</p> <p >2 weeks</p></Card.Text>
       </div>
       <GetStartedButton/>
       </div>
      </Card.Body>
    </Card>
    </div>
}
export default InvestmentManagers