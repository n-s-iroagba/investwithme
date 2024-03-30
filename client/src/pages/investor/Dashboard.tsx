import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, Row, Col} from 'react-bootstrap'
import DashboardNav from '../../components/DashboardNav'
import { faWallet,faHandHoldingDollar,faQuestion,faMoneyBillTransfer,faMoneyBill, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/DashboardNav'
import '../../assets/Styles.css'
import { miniFooter } from '../../components/Footer'


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(false);
  const id = 1
  const [username, setUsername] = useState<string>('');
  const [role,setRole] = useState<string>('');

  useEffect(() => { 
    const authorised = true
    if (authorised){
      setAuthorised(authorised)
    }
  }, [setAuthorised, navigate]);

  if (!authorised) {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
        <Spinner></Spinner>
        <div>You are not authorised to see this page</div>
        <button className='button-styles button-width-narrow mt-3' onClick={()=>navigate('/login')}>Go To Login</button>
      </div>
    );
  }

  const icons = [faQuestion,faHandHoldingDollar,faWallet,faMoneyBill,faMoneyBillTransfer,faUserFriends ];
  const actions: string[] = ['how-to-guide', 'invest-managers','portfolio','withdraw','transactions',`referral`];
  const texts: string[] = ['How-to guides', 'Invest','Portfolio','Withdraw','Transactions','Refer and Earn'];

  return (
    <div className='primary-background d-flex flex-column dashboard align-items-center py-5' >
      <DashboardBar newNotification={true} username={'nnamdoskolo'} />
   
        <Row className="d-flex justify-content-center align-items-center w-100 gx-3 gy-3 mt-3">
          {texts.map((text, index) => (
            <Col xs={4}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
           <Col xs={4}>  <button className='mt-3 button-styles text-light'>Logout</button></Col>
        </Row>
        {miniFooter}
    </div>
  );
};
export default Dashboard