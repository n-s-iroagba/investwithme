import React from 'react';
  import { Row, Col } from 'react-bootstrap';
  import { InvestmentTiersCard } from '../../components/InvestmentTiersCard';
  import { InvestButton } from '../../components/Button';
  import { miniFooter } from '../../components/Footer';

  const InvestmentManagers:React.FC = () => {
      const investorId = 1
      const managerData = [
          {  id: 1,
              title: "150% RETURNS",
              image: "https://via.placeholder.com/150",
              name: "Anna Glasgow",
              minDeposit: "500",
              duration: "2 weeks",
          },
          {id: 2,
              title: "150% RETURNS",
              image: "https://via.placeholder.com/150",
              name: "Anna Glasgow",
              minDeposit: "500",
              duration: "2 weeks",
          },
          {id: 3,
              title: "150% RETURNS",
              image: "https://via.placeholder.com/150",
              name: "Anna Glasgow",
              minDeposit: "500",
              duration: "2 weeks"
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
  
                  {managerData.map((data, index) => (
                      <Col key={index} xs={12} md={6} lg={4}>
                          <InvestmentTiersCard
                              title={data.title}
                              image={data.image}
                              name={data.name}
                              minDeposit={data.minDeposit}
                              duration={data.duration}
                              investbutton={<InvestButton managerId={data.id} investorId={investorId} />}
                          />
                      </Col>
                  ))}
              </Row>
              {miniFooter}
          </div>
      );
  };

export default InvestmentManagers