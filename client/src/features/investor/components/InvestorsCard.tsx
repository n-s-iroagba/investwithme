import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import '../../../common/styles/styles.css'

const InvestorsCard: React.FC<{ amountDeposited:number,firstName: string, lastName: string, hasInvested: boolean, withdrawalDate:string,dueForWithdrawal:boolean,deleteButton:any,completeDeposit:boolean,amount:number,date:Date}> = ({ amount, firstName,
   lastName,
    hasInvested,
     withdrawalDate,
     dueForWithdrawal,
     completeDeposit,
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
              <Card.Text>{amount}</Card.Text>
              <Card.Text>Investement Status: {hasInvested?'Has Invested':'Has Not yet Invested'}</Card.Text>
             {hasInvested && <Card.Text>Deposit Status: { completeDeposit?'Deposit is complete':'Deposit is not complete'}.</Card.Text>}
          
             {hasInvested && <Card.Text>Withdrawal Date: {withdrawalDate}</Card.Text>}
             {hasInvested && <Card.Text><small>**{dueForWithdrawal?'Due For Withdrawal':'Not Due For Withdrawal'}.</small></Card.Text>}
            </Card.Body> 
          </Card>
         <div className='d-flex justify-content-center mt-3'>{deleteButton}</div>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  );
};


export default InvestorsCard;

