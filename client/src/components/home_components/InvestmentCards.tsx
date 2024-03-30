import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { InvestmentTiersCard } from '../InvestmentTiersCard';
import { InvestButton } from '../Button';
import { miniFooter } from '../Footer';
const InvestmentCards: React.FC = () => {


    const investmentData = [
        {
            title: "150% RETURNS",
            image: "https://via.placeholder.com/150",
            name: "Anna Glasgow",
            minDeposit: "500",
            
            duration: "2"
        },
        {
            title: "150% RETURNS",
            image: "https://via.placeholder.com/150",
            name: "Anna Glasgow",
            minDeposit: "500",
            
            duration: "2"
        },
        {
            title: "150% RETURNS",
            image: "https://via.placeholder.com/150",
            name: "Anna Glasgow",
            minDeposit: "500",
            
            duration: "2"
        }
    ];

    return (
        <div className='primary-background px-3'>
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Select Your Fund Manager And Investment Tier
                    </h3>
                </Col>

                {investmentData.map((data, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <InvestmentTiersCard
                            title={data.title}
                            image={data.image}
                            name={data.name}
                            minDeposit={data.minDeposit}
                    
                            duration={data.duration}
                            investbutton={<InvestButton managerId={1} investorId={2}  />}
                        />
                    </Col>
                ))}
            </Row>
            {miniFooter}
        </div>
    );

}
export default InvestmentCards