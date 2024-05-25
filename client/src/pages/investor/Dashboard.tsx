import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Row, Col} from 'react-bootstrap'
import DashboardNav from '../../components/general/DashboardNav'
import { faWallet,faHandHoldingDollar,faQuestion,faMoneyBillTransfer,faMoneyBill, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/general/DashboardNav'
import '../../components/styles.css'
import { MiniFooter } from '../../components/home_components/Footer'
import { getInvestment,  logOut,getNotifications,getTransactions } from '../../utils/helpers'
import { ReadableItem } from '../../utils/types'


const Dashboard: React.FC<{username:string,id:number}>= ({username,id}) => {
  const [newNotificationNumber, setNewNotificationNumber]= useState(7)
  const [earnings, setEarnings] = useState(0)
  const [amountInvested, setAmountInvested] = useState(0)
  
  const countUnreadItems = (items: ReadableItem[]): number => {
    return items.filter((item:ReadableItem) => !item.read).length;
  };
  const navigate = useNavigate();

  useEffect(() => {

    const fetchNotifications = async () => {
     try{
      const response = await getNotifications(id)
      
      if (response){
        setNewNotificationNumber(countUnreadItems(response))
        localStorage.setItem('cassockNotifications', JSON.stringify(response))

      }
     }catch(error:any){
     }
    }

    const fetchTransactions = async () => {
      try{
       const response = await getTransactions(id)
       console.log(response)
       if (response){
         localStorage.setItem('cassockTransactions', JSON.stringify(response))
       }
      }catch(error:any){
      }
     }
     const fetchInvestementData = async () => {
      
      try {
        const response = await getInvestment(id);
        console.log(response)
       if (response.status===200){
        setEarnings(response.data.investment.earnings)
        setAmountInvested(response.data.investment.amountDeposited)
        localStorage.setItem('cassockInvestment', JSON.stringify(response.data))
       }
      } catch (error) {
        console.error(error);
      };
    }
    fetchNotifications()
    fetchTransactions()
    fetchInvestementData();
  }, [id])


  const icons = [faQuestion,faHandHoldingDollar,faWallet,faMoneyBill,faMoneyBillTransfer,faUserFriends ];
  const actions: string[] = ['how-to-guide', 'invest/managers','portfolio','withdraw','transactions',`referral`];
  const texts: string[] = ['How-to guides', 'Invest','Earnings','Withdraw','Transactions','Refer and Earn'];

  return (
    <div className='primary-background ' >
      <div className=' d-flex flex-column dashboard align-items-center py-5' >
      <div className='text-light mb-3'>Logo</div>
      <DashboardBar deposit={amountInvested} earnings={earnings} numberOfNewNotifications={newNotificationNumber} username={username +'.'} />
   
      <Row className="d-flex justify-content-center align-items-center w-100 gx-1 gy-1 mt-1">
      {texts.map((text, index) => (
        <React.Fragment key={index}>
        
        
            <Col xs={4}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
    
        </React.Fragment>
      ))}
      <Col xs={6}>
        <button className='mt-5 button-styles text-light' onClick={()=>logOut}>Logout</button>
      </Col>
    </Row>
    </div>
        <MiniFooter primaryVariant={true}/>
    </div>
  );
};
export default Dashboard