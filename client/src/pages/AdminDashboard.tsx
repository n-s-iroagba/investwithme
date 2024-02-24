import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col,Spinner} from 'react-bootstrap'
import DashboardNav from '../components/DashboardNav'
import { faBars, faBell, faMoneyBillTrendUp,faHandHoldingDollar, faWallet, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/Styles.css'
import { checkAuthorised } from '../helpers/api'
// <{greeting:string,username:string}>
const DashboardBar: React.FC<{username:string}> = (props) => {
  return (
    <Row className="d-flex text-light justify-content-start align-items-center">
      <Col className='text-light' xs={6}>
        <h6 className='mb-0'>Good Afternoon,</h6>
    
      </Col>

      <Col xs={6} className="d-flex text-light justify-content-end align-items-center">
        <div className='logo-container'>
          <div className='logo '>logo</div>
          <FontAwesomeIcon icon={faBell} />
        </div >
      </Col>
      <h6 className='text-wrap'>{props.username}</h6>
    </Row>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [role,setRole] = useState<string>('');

  useEffect(() => {
    const authorised = checkAuthorised('admin', navigate,setUsername,setRole);
    if (authorised){
      setAuthorised(authorised)
    }
  }, [setAuthorised, navigate]);

  if (!authorised||role !== 'admin') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner>You are not authorised. Redirecting...</Spinner>
      </div>
    );
  }

  const icons = [faWallet,faUser, faHandHoldingDollar, ];
  const actions: string[] = ['admin wallets', 'admin-managers','admin-investors'];
  const texts: string[] = ['Wallets', 'Managers','investors'];

  return (
    <div className='primary-background px-4 py-4'>
      <DashboardBar username={username} />
   
        <Row className="justify-content-between gy-2 gx-2">
          {texts.map((text, index) => (
            <Col key={index} xs={4} sm={4} md={4} lg={3} xl={3}>
              <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
            </Col>
          ))}
        </Row>
   
    </div>
  );
};

export default AdminDashboard;
