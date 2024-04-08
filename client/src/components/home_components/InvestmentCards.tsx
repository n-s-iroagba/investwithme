import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { InvestmentTiersCard } from '../general/InvestmentTiersCard';
import { GetStartedButton } from '../general/Button';

const InvestmentCards: React.FC = () => {


    const investmentData = [
        {
            id: 1,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            qualification:'Chartered Financial Analyst',
            lastName: "Glasgow",
            minimumInvestmentAmount: 500,
            duration: 2,
        },
        {
            id: 2,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            lastName: "Glasgow",
            qualification:'Chartered Wealth Manager',
            minimumInvestmentAmount: 500,
            duration: 2,
        },
        {
            id: 3,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            lastName: "Glasgow",
            qualification: 'MSc Finance',
            minimumInvestmentAmount: 500,
            duration: 2
        }
    ];

    return (
        <div className='px-3'>
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Select Your Fund Manager And Investment Tier
                    </h3>
                </Col>

                {investmentData.map((data, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <InvestmentTiersCard
                            percentageYield={`${data.percentageYield}% RETURN ON INVESTMENT`}
                            image={data.image}
                            firstName={data.firstName}
                            lastName={data.lastName}
                            qualification={data.qualification}
                            minimumInvestmentAmount={`$${data.minimumInvestmentAmount}`}
                            duration={`${data.duration} weeks`}
                            button={<GetStartedButton/>}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );

}
export default InvestmentCards