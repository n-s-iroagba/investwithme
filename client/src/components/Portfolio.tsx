import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../assets/Styles.css'



const AdminInvestor:React.FC = ()=>{




  return (
    
    <Accordion className='primary-background'>
      <Accordion.Item eventKey={`${0}`}>
        <Accordion.Header><div className='w-100 d-flex justify-content-between px-2'><p>firstName lastName</p><p>invested</p><p>due in 14 days</p></div></Accordion.Header>
        <Accordion.Body>
          <div>
          <p>Date Registered</p>
          <p>Country</p>
          <p>bank</p>
          <div>
            <p>WalletType</p>
          </div>

          <div>
            <p>date Invested</p>
            <p>date Invested</p>
          </div>
          <div>
            <button>Update Payment</button>
            <button>Delete Investor</button>
          </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  ); 

  }
export default AdminInvestor