import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardNav from '../../components/general/DashboardNav';
import { faHandHoldingDollar, faWallet, faUser, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { AdminDashboardBar } from '../../components/general/DashboardNav';
import { MiniFooter } from '../../components/home_components/Footer';
import { useNavigate } from 'react-router-dom';
import '../../components/styles.css';
import { getNewbies } from '../../utils/helpers';


const AdminDashboard: React.FC<{ name: string }> = ({ name }) => {
  const navigate = useNavigate();
  const icons = [faUser, faWallet, faUser, faHandHoldingDollar];
  const actions: string[] = ['admin/managers', 'admin/wallets', 'admin/investor-dashboard', 'admin/promo'];
  const texts: string[] = ['Managers', 'Wallets', 'Investors', 'Promo'];
  const [newbies,setNewbies] = useState<string[]>([]);
  useEffect(()=>{
      const newbiesResponse = getNewbies()
      setNewbies(newbiesResponse)
  }, [],)

  return (
    <div className='primary-background full-height px-5 py-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'>Logo</div>
      <AdminDashboardBar username={name} />
      <Row className="d-flex justify-content-center gy-2 gx-2">
        {texts.map((text, index) => (
          <Col key={text} xs={6} sm={4} md={3}>
              {newbies.includes(text) ? (
                <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} notifIcon={faDotCircle} />
              ) : (
                <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
              )}
         
          </Col>
        ))}
        <Col xs={12} md={6}>
          <button className='mt-5 button-styles text-light'>Logout</button>
        </Col>
      </Row>
      <MiniFooter primaryVariant={true} />
    </div>
  );
};

export default AdminDashboard