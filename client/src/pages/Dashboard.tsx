import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, Row, Col } from 'react-bootstrap'
import DashboardNav from '../components/DashboardNav'
import { faWallet, faBell, faUser,faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DashboardBar } from './AdminDashboard'
import '../assets/Styles.css'
// <{greeting:string,username:string}>
// const DashboardBar: React.FC = () => {
//   return (
//     <Row>
//       <Col xs={6}>
//         <h5>Good Afternoon,</h5>
//         <h6>Wakkias</h6>
//       </Col>

//       <Col xs={6} className="d-flex justify-content-end align-items-center">
//         <div className='logo-container'>
//           <div className='logo'>logo</div>
//           <FontAwesomeIcon icon={faBell} />
//         </div >
//       </Col>
//     </Row>
//   );
// };

// #1a6e41;
//   --secondary-color: #79b294


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [role,setRole] = useState<string>('');

  useEffect(() => { 
    const authorised = true
    // checkAuthorised('admin', navigate,setUsername,setRole);
    if (authorised){
      setAuthorised(authorised)
    }
  }, [setAuthorised, navigate]);

  if (!authorised) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner>You are not authorised. Redirecting...</Spinner>
      </div>
    );
  }

  const icons = [faWallet,faUser, faHandHoldingDollar, ];
  const actions: string[] = ['how-to-invest', 'select-manager','top-up','refer','withdraw','transactions','portfolio','profile'];
  const texts: string[] = ['How To Invest', 'Invest','Top-up Investment','Refer And Earn','Withdraw','transactions','Portfolio','Profile'];

  return (
    <div className='primary-background px-4 py-4'>
      <DashboardBar username={'nnamdoskolo'} />
   
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
export default Dashboard