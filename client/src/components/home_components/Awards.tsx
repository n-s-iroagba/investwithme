import React from 'react';
import { Col, Row } from 'react-bootstrap';
import image1 from '../../assets/awards/award1.png'
import image2 from '../../assets/awards/award2.png'
import image3 from '../../assets/awards/award4.png'
import image4 from '../../assets/awards/award5.png'

const awards = [image1, image2, image3, image4,];

const Awards: React.FC = () => {
    return (
        <div className='d-flex flex-column align-items-center py-4 px-4'>
        <h4>Awards</h4>
        <div className='primary-line mb-2'></div> 
        <Row>
  {
    awards.map((award: any, index: number) => (
      <Col style={{  height: '4cm' }} key={index} xs={12} md={6} lg={3} className='gx-3 d-flex justify-content-center align-items-center border border-white'>
          <img className='p-1' style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }} src={award} alt='award' />
      </Col>
    ))
  }
</Row>

        </div>
    );
};

export default Awards;
