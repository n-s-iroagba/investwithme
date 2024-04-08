import React from 'react'
import NotificationModal from '../../components/investor/NotificationModal'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../../components/styles.css'
import { NotificationType } from '../../utils/types';


const Notifications = () =>{
    const notifications:NotificationType[] = [
      {
        id:1,
        title: 'Bonus Payout',
        message: 'You have received a new message.'
      },
      ]
    return(
      <div className='primary-background full-height' style={{ padding: '0%' }}>
      <div className='d-flex w-100 flex-column align-items-center'>
        <FontAwesomeIcon style={{ width: '1cm', height: '1cm' }} className='w-100 mt-4' icon={faTimesCircle} />
        <h2 className='text-center text-light w-100 my-4'>Your Notifications</h2>
      </div>
    
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Row className='w-100 d-flex justify-content-center align-items-center px-3' key={notification.id}>
            <Col className='mb-2' xs={12} md={6} lg={4}>
              <NotificationModal data={notification} />
            </Col>
          </Row>
        ))
      ) : (
        <h6>No notifications yet</h6>
      )}
    </div>
    )
}
export default Notifications