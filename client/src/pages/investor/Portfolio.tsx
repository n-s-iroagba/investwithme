import React, { useEffect, useState } from 'react';
import PortfolioComponent from '../../components/investor/PortfolioComponent';
import { Button, Form, Modal } from 'react-bootstrap';
import { PortfolioDataType } from '../../utils/types';
import { getPorfolioData } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';



const Portfolio:React.FC = ()=>{
    const [selectedOption, setSelectedOption] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [portfolioData,setPortfolioData] = useState<PortfolioDataType|null>(null)
    const navigate = useNavigate()

    useEffect(() =>{
      const data = getPorfolioData()
      setPortfolioData(data)

    }, [])

    const handleSelectChange = (event:any) => {
      setSelectedOption(event.target.value);
    };
  const onHide=()=>{
    setShowModal(false)
    window.location.reload()
  }
    const handleSubmit = (event:any) => {
      event.preventDefault();
      // Handle form submission here, for example, send data to a server or perform an action
    onHide()
       // Close the modal after form submission
    };
 return(
<div className='d-flex flex-column align-items-center'>
    <h1 className='text-center my-2'>My Portfolio</h1>
{portfolioData?<button className='mb-3 button-styles text-light button-width-narrow' onClick={()=>setShowModal(true)}>Extend Investment Duration</button>
:
<button className='mb-3 button-styles text-light button-width-narrow' onClick={()=>navigate('/invest/managers')}>Invest</button>
}
<Modal show={showModal}>
      <Modal.Header closeButton>
        <Modal.Title>Extend Your Investment Duration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="selectReferral">
            <Form.Label>Select Referral Option:</Form.Label>
            <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select...</option>
              <option value="2-weeks-170%">2 weeks for 170%</option>
              <option value="3-weeks-200%">3 weeks at 200%</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
<PortfolioComponent data={portfolioData}/>
</div>

 )
 }
 export default Portfolio