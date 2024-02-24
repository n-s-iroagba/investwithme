import React from 'react';
import { Col, Row } from 'react-bootstrap';
import home from '../assets/header.jpeg'
const awards = ['a', 'b', 'c', 'd', 'e', 'f'];

const Awards: React.FC = () => {
    return (
        <div className='d-flex flex-column align-items-center py-4 px-4'>
        <h4>Awards</h4>
        <div className='primary-line mb-2'></div> 
        <Row className='primary-background'>
  {
    awards.map((award: any, index: number) => (
      <Col style={{  height: '4cm' }} key={index} xs={12} md={4} lg={4} className='gx-3 d-flex justify-content-center align-items-center border border-white'>
          <img className='p-1' style={{ width: '100%', height: '100%', maxWidth: '4cm', maxHeight: '3cm' }} src={home} alt='award' />
      </Col>
    ))
  }
</Row>

        </div>
    );
};

export default Awards;
