import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Row, Col} from 'react-bootstrap'
import DashboardNav from '../../components/general/DashboardNav'
import { faWallet,faHandHoldingDollar,faQuestion,faMoneyBillTransfer,faMoneyBill, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/general/DashboardNav'
import '../../components/styles.css'
import { MiniFooter } from '../../components/home_components/Footer'
import { getAccountBalance, getNumberOfNewNotifications, logOut } from '../../utils/helpers'


const Dashboard: React.FC<{username:string}>= ({username}) => {
  const [newNotifications,setNewNotification] = useState(0)
  const [balance,setBalance] = useState(0)
  
  const navigate = useNavigate();
  useEffect(() =>{
    const notification:number = getNumberOfNewNotifications()
    setNewNotification(notification)
    const receivedbalance:number = getAccountBalance()
    setBalance(receivedbalance)
  }, [])

  const icons = [faQuestion,faHandHoldingDollar,faWallet,faMoneyBill,faMoneyBillTransfer,faUserFriends ];
  const actions: string[] = ['how-to-guide', 'invest/managers','portfolio','withdraw','transactions',`referral`];
  const texts: string[] = ['How-to guides', 'Invest','Earnings','Withdraw','Transactions','Refer and Earn'];

  return (
    <div className='primary-background d-flex flex-column dashboard align-items-center py-5' >
      <div className='text-light mb-3'>Logo</div>
      <DashboardBar balance={balance} numberOfNewNotifications={newNotifications} username={username} />
   
        <Row className="d-flex justify-content-center align-items-center w-100 gx-1 gy-1 mt-1">
          {texts.map((text, index) => (
            <Col xs={4}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
           <Col xs={6}>  <button className='mt-5 button-styles text-light' onClick={()=>logOut}>Logout</button></Col>
        </Row>
        <MiniFooter primaryVariant={true}/>
    </div>
  );
};
export default Dashboard