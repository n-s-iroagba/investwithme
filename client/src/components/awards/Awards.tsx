import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Line from '../line/Line'
const awards = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const Awards: React.FC = () => {
    return (
        <div >
        <div className='main-intro'>
        <div className='space-down'>
        <h4>Awards</h4><Line/> 
        </div>
        </div>
            <Row className='justify-content-center'>
                {
                    awards.map((award: any, index: number) => (
                        <Col key={index} xs={6} md={4} lg={3} className='text-center mb-3'>
                            {award}
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default Awards;
