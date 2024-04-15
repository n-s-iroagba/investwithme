import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, Row, Col} from 'react-bootstrap'
import DashboardNav from '../../components/general/DashboardNav'
import { faWallet,faHandHoldingDollar,faQuestion,faMoneyBillTransfer,faMoneyBill, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/general/DashboardNav'
import '../../components/styles.css'
import { MiniFooter } from '../../components/home_components/Footer'


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(false);


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
  const actions: string[] = ['how-to-guide', 'invest/managers','portfolio','withdraw','transactions',`referral`];
  const texts: string[] = ['How-to guides', 'Invest','Earnings','Withdraw','Transactions','Refer and Earn'];

  return (
    <div className='primary-background d-flex flex-column dashboard align-items-center py-5' >
      <div className='text-light mb-3'>Logo</div>
      <DashboardBar newNotification={true} username={'nnamdoskolo'} />
   
        <Row className="d-flex justify-content-center align-items-center w-100 gx-1 gy-1 mt-1">
          {texts.map((text, index) => (
            <Col xs={4}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
           <Col xs={6}>  <button className='mt-5 button-styles text-light'>Logout</button></Col>
        </Row>
        <MiniFooter primaryVariant={true}/>
    </div>
  );
};
export default Dashboard