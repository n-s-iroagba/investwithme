import React, { useEffect, useState } from 'react'
import NotificationModal from '../../components/investor/NotificationModal'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../../components/styles.css'
import { NotificationType } from '../../utils/types';
import { markNoficationsAsRead } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { MiniFooter } from '../../components/home_components/Footer';


const Notifications = () =>{
  const [notifications , setNotifications]= useState<NotificationType[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = 1;
        const storedNotifications = localStorage.getItem('cassockNotifications');
        const notifs: NotificationType[] = storedNotifications ? JSON.parse(storedNotifications) : [];

        setNotifications(notifs);
        await markNoficationsAsRead(id); // Ensure this is an async function
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error);
      }
    };

    fetchNotifications();
  }, []);
 
    return(
      <div className='primary-background'>
      <div className='primary-background full-height' style={{ padding: '0%' }}>
      <div className='d-flex w-100 flex-column align-items-center'>
        <FontAwesomeIcon style={{ width: '1cm', height: '1cm' }} onClick={()=>navigate('/dashboard')} className='w-100 mt-4' icon={faTimesCircle} />
      </div>

      {notifications.length > 0 ? (
        <>
          <h2 className='text-center text-light w-100 my-4'>Your Notifications</h2>
          {notifications.map((notification) => (
            <Row className='w-100 d-flex justify-content-center align-items-center px-3' key={notification.id}>
              <Col className='mb-2' xs={12} md={6} lg={4}>
                <NotificationModal data={notification} />
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <h5 className='text-center text-light w-100 my-4'>No notifications yet</h5>
      )}
    </div>
    <MiniFooter primaryVariant/>
    </div>
    )
}
export default Notifications

