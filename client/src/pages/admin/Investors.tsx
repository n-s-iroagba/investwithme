import React, { useEffect, useState } from 'react';
import InvestorsCard from '../../components/admin/InvestorsCard'; // Adjust the path as per your project structure
import { Col, Row } from 'react-bootstrap';
import DeleteModal from '../../components/admin/DeleteModal';
import { getInvestors } from '../../utils/helpers';
import { AdminInvestorType } from '../../utils/types';


const Investors = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
const [showDeleteModal,setShowDeleteModal]= useState(false)
const [investors, setInvestors] = useState<AdminInvestorType[]>([])

useEffect(() =>{
const data:AdminInvestorType[]= getInvestors()
setInvestors(data)

},[])
const handleDelete =(id:number) =>{
setShowDeleteModal(true)
setIdToBeDeleted(id)

}

  return (
    <div className='primary-background full-height px-2'>
    <h2 className='text-center text-light py-3'>Your Investors</h2>
    <Row className='flex flex-column align-items-center gy-3'>
      {investors.length>0?investors.map((investor,index) => (
        <Col md={6}>
        <InvestorsCard
         firstName={investor.firstName}
         lastName={investor.lastName}
         hasInvested={investor.hasInvested}
         withdrawalDate = {investor.withdrawalDate}
         dueForWithdrawal = {investor.dueForWithdrawal}
         completeDeposit= {investor.completeDeposit}
          deleteButton={<button className='red-button button-width-narrow' onClick={()=>handleDelete(investor.id)}>Delete</button>} 
        />
        </Col>
      )):
      <h2 className='text-center text-light'>No Investors...</h2>
      }
    </Row>
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='investor'/>
    </div>
  );
};
export default Investors;

