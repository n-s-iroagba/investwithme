import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';
import PaymentCard from '../../components/admin/PaymentCard';
import { getBonus } from '../../utils/helpers';
import { BonusType } from '../../utils/types';

const Bonus = () => {
const [dueBonuses, setDueBonus] = useState<BonusType[]>([])

useEffect(() => {
  const bonusData:BonusType[] = getBonus()
  setDueBonus(bonusData)

}, [])

  return (
    <div className='primary-background d-flex flex-column align-items-center full-height text-light px-3'>
      <h2 className='my-3'>Pending Bonus Payments</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2' >
      {dueBonuses.length>0?dueBonuses.map((dueBonus:BonusType) => (
        <Col  className={dueBonuses.length===1?'w-100':''} xs={12} md={4} lg={3}>
        <PaymentCard key={dueBonus.id} {...dueBonus} entity='promo' />
        </Col>
      ))
    :
    <h2 className='text-light text-center'>No Due Bonus Payments.</h2>}
      </Row>
      <MiniFooter primaryVariant/>
    </div>
  );
};

export default Bonus;
