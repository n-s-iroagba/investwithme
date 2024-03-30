import React,{useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col,Spinner} from 'react-bootstrap'
import DashboardNav from '../../components/DashboardNav'
import {faHandHoldingDollar, faWallet, faUser} from '@fortawesome/free-solid-svg-icons'
import { DashboardBar } from '../../components/DashboardNav'

import '../../assets/Styles.css'
import { checkAuthorised } from '../../helpers/api'

// <{greeting:string,username:string}>


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [role,setRole] = useState<string>('');
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const receivedToken:string|null = searchParams.get('token');
    if (receivedToken){
      localStorage.setItem('cAssocKJwtToken',receivedToken)
    }
    const authorised = checkAuthorised('admin', navigate,setUsername,setRole);
    if (authorised){
      setAuthorised(authorised)
    }
  }, [setAuthorised, navigate, location.search]);

 
 if (!authorised||role !== 'admin') {

    return (
      <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
        <Spinner></Spinner>
        <div>You are not authorised to see this page</div>
        <button className='button-styles button-width-narrow mt-3' onClick={()=>navigate('/login')}>Go To Login</button>
      </div>
    );

  }
  const icons = [faWallet,faUser, faHandHoldingDollar, ];
  const actions: string[] = ['admin/wallets', 'admin/managers','admin/investors'];
  const texts: string[] = ['Wallets', 'Managers','investors'];

  return (
    <div className='primary-background px-4 py-4'>
      <DashboardBar newNotification={true} username={username} />
   
        <Row className="justify-content-between gy-2 gx-2">
          {texts.map((text, index) => (
            <Col className='mr-0 bg-danger' key={index} xs={4} sm={4} md={4} lg={3} xl={3}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
        </Row>
   
    </div>
  );
};

export default AdminDashboard;
