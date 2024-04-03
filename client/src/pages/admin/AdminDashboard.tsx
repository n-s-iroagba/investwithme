import React,{useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col,Spinner} from 'react-bootstrap'
import DashboardNav from '../../components/general/DashboardNav'
import {faHandHoldingDollar, faWallet, faUser} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/general/DashboardNav'
import { MiniFooter } from '../../components/home_components/Footer'

import '../../components/styles.css'
import { isAuthorised } from '../../utils/auth'

// <{greeting:string,username:string}>


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
  //   const receivedToken:string|null = searchParams.get('token');
  //   if (receivedToken){
  //     localStorage.setItem('cAssocKJwtToken',receivedToken)
  //   }
  //   const authorised = isAuthorised('admin', setUsername);
  //   if (authorised){
  //     setAuthorised(authorised)
  //   }

  }, [setAuthorised, navigate, location.search]);

 
 if (!authorised) {

    return (
      <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
        <Spinner></Spinner>
        <div>You are not authorised to see this page</div>
        <button className='button-styles button-width-narrow mt-3' onClick={()=>navigate('/login')}>Go To Login</button>
      </div>
    );

  }
  const icons = [faUser,faWallet,faUser, faHandHoldingDollar, ];
  const actions: string[] = ['admin/managers','admin/wallets','admin/investors','promos'];
  const texts: string[] = [ 'Managers','Wallets', 'Investors', 'Promo'];


  return (
    <div className='primary-background px-4 py-4'>
      <DashboardBar newNotification={false} username={username} />
   
        <Row className="justify-content-between gy-2 gx-2">
          {texts.map((text, index) => (
            <Col className='mr-0 bg-danger' key={index} xs={4} sm={4} md={4} lg={3} xl={3}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
        </Row>
   <MiniFooter primaryVariant = {true} />
    </div>
  );
};

export default AdminDashboard;
