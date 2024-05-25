import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import DeleteModal from '../../components/admin/DeleteModal';
import { getInvestors } from '../../utils/helpers';
import { formatStartDate } from '../../utils/utils';
import { InvestorAndInvestment } from '../../../../common/types';
import { MiniFooter } from '../../components/home_components/Footer';

const InvestorsCard: React.FC<{ firstName: string, lastName: string,amount:number,amountDeposited:number,date:Date|null, deleteButton:JSX.Element }> = ({ firstName,
  lastName,
   amount,
   amountDeposited,
   date,
  
    deleteButton}) => {

 return (
   <Accordion>
     <Accordion.Item eventKey="0">
       <Accordion.Header> {firstName} {lastName}</Accordion.Header>
       <Accordion.Body>
         <Card className='w-100'>
           <Card.Body>
            <Card.Text>Investment Amount: {amount}</Card.Text>
            <Card.Text>Amount currently deposited: {amountDeposited}</Card.Text>
            <Card.Text>Date of firstDeposit {date?formatStartDate(date.toISOString()):'no deposit made yet'}</Card.Text>
            <Card.Text></Card.Text>
            <Card.Text></Card.Text>
           </Card.Body> 
         </Card>
        <div className='d-flex justify-content-center mt-3'>{deleteButton}</div>
       </Accordion.Body>
       </Accordion.Item>
   </Accordion>
 );
};

const Investors = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
const [showDeleteModal,setShowDeleteModal]= useState(false)
const [investorData, setInvestorData] = useState<InvestorAndInvestment[]>([])
useEffect(() => {
  const fetchInvestorData = async () => {
    try {
      const data: InvestorAndInvestment[] = await getInvestors();
    data&& setInvestorData(data);
    } catch (error) {
      console.error('Error fetching  data.investor data:', error);
    }
  };

  fetchInvestorData();
}, []);
const handleDelete =(id:number) =>{
setShowDeleteModal(true)
setIdToBeDeleted(id)

}

  return (
    <div className='primary-background '>
    <div className=' full-height px-2'>
    <h2 className='text-center text-light py-3'>Your Investors</h2>
    <Row className='flex flex-column align-items-center gy-3'>
      {investorData.length?investorData.map((data,index) => (
        <Col md={6}>
        <InvestorsCard
         firstName={ data.investor.firstName}
         lastName={data.investor.lastName}
         amount={data.investment.amount}
         date={data.investment.investmentDate}
         amountDeposited={data.investment.amountDeposited}
          deleteButton={<button className='red-button button-width-narrow' onClick={()=>handleDelete(data.investor.id)}>Delete</button>} 
        />
        </Col>
      )):
      <h2 className='text-center text-light'>No Investors...</h2>
      }
    </Row>
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='investor'/>
    </div>
    <MiniFooter primaryVariant/>
    </div>
  );
};
export default Investors;

