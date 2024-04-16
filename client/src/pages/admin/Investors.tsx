import React, { useState } from 'react';
import InvestorsCard from '../../components/admin/InvestorsCard'; // Adjust the path as per your project structure
import { Col, Row } from 'react-bootstrap';
import DeleteModal from '../../components/admin/DeleteModal';


const Investors = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
const [showDeleteModal,setShowDeleteModal]= useState(false)

const data = [

  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    hasInvested: false,
    withdrawalDate:'string',
    dueForWithdrawal:true
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    hasInvested: true,
    withdrawalDate:'string',
    dueForWithdrawal:false
  }
];

const handleDelete =(id:number) =>{
setShowDeleteModal(true)
setIdToBeDeleted(id)

}

  return (
    <div className='primary-background full-height'>
    <h2 className='text-center text-light py-3'>Your Investors</h2>
    <Row className='flex flex-column align-items-center gy-3'>
      {data.map((investor,index) => (
        <Col md={6}>
        <InvestorsCard
         firstName={investor.firstName}
         lastName={investor.lastName}
         hasInvested={investor.hasInvested}
         withdrawalDate = {investor.withdrawalDate}
         dueForWithdrawal = {investor.dueForWithdrawal}
          deleteButton={<button className='red-button button-width-narrow' onClick={()=>handleDelete(investor.id)}>Delete</button>} 
        />
        </Col>
      ))}
    </Row>
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='investor'/>
    </div>
  );
};
export default Investors;