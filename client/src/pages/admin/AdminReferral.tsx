import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';
import PaymentCard from '../../components/admin/PaymentCard';
import { ReferralType } from '../../utils/types';
import { getUnpaidReferrals } from '../../utils/helpers';

const AdminReferral = () => {
  const [referrals, setReferral] = useState<ReferralType[]>([])
  
  useEffect(()=>{

    const referralArray = getUnpaidReferrals()
    setReferral(referralArray)
  }, [])
 


  return (
    <div className='primary-background d-flex flex-column align-items-center full-height text-light px-3'>
      <h2 className='my-3'>Pending Referrals</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2' >
      {referrals.length>0? referrals.map((referral) => (
        <Col xs={12} md={4} lg={3}>
        <PaymentCard key={referral.id} {...referral} entity='referral' />
        </Col>
      ))
      :
      <h2 className='text-light text-center'>No Referrals.</h2>}
      </Row>
      <MiniFooter primaryVariant/>
    </div>
  );
};

export default AdminReferral;
