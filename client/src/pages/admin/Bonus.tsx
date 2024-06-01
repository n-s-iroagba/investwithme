import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';
import PaymentCard from '../../components/admin/PaymentCard';
import { getBonus } from '../../utils/helpers';

const Bonus = () => {
  const [dueBonuses, setDueBonus] = useState([])

  useEffect(() => {
    const fetchBonusData = async () => {
      try {
        const bonusData: any = await getBonus();
        console.log(bonusData)
        bonusData && setDueBonus(bonusData);
      } catch (error) {
        console.error('Error fetching bonus data:', error);
      }
    };

    fetchBonusData();

  }, [])

  return (
    <div className='primary-background '>
    <div className='primary-background d-flex flex-column align-items-center full-height text-light px-3'>
      <h2 className='my-3'>Pending Bonus Payments</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2' >
      {dueBonuses.length>0?dueBonuses.map((dueBonus:any) => (
        <Col  className={dueBonuses.length===1?'w-100':''} xs={12} md={4} lg={3}>
        <PaymentCard key={dueBonus.id} 
        amount={dueBonus.amount}
        currency={dueBonus.wallet.currency}
        address= {dueBonus.wallet.address}
        id={dueBonus.id}
        entity='promo' />
        </Col>
      ))
    :
    <h2 className='text-light text-center'>No Due Bonus Payments.</h2>}
      </Row>
      </div>
      <MiniFooter primaryVariant/>
      </div >
  );
};

export default Bonus;
