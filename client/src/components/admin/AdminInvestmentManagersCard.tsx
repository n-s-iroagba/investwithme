import React from 'react';
import { Row, Col,Form } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import {  MoveToPatchManager } from '../../components/general/Button';

import { MiniFooter } from '../../components/home_components/Footer';
import { ManagerType } from '../../utils/types';
import '../../components/styles.css'

const AdminInvestmentManagersCard: React.FC = () => {
    
    const managerData:ManagerType[] = [
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
        <>
            {managerData.length > 0?
                <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Your Managers
                    </h3>
                </Col>

                {managerData.map((data,) => (
                    <Col key={data.id} xs={12} md={6} lg={4}>
                        <InvestmentTiersCard
                            percentageYield={`${data.percentageYield}% RETURN ON INVESTMENT`}
                            image={data.image}
                            firstName={data.firstName}
                            lastName={data.lastName}
                            qualification={data.qualification}
                            minimumInvestmentAmount={`$${data.minimumInvestmentAmount}`}
                            duration={`${data.duration} weeks`}
                            button={<MoveToPatchManager manager={data} />}
                            deleteButton={<button className='red-button'>Delete Manager</button>}
                        />
 <Form.Group as={Col} controlId="validationFormik01">
                                <div className="mb-0 text-light">
                                    First name
                                </div>
                                <Form.Control
                                    required
                                    type="text"
                                    name="firstName"
                                    value={'adfadgd'}
                                    
                                    className="text-light custom-input bg-transparent form-control"
                                />
                            </Form.Group>




                    </Col>
                ))}
            </Row>
            :
            <h3 className='text-center mt-4 text-light'>
                No Managers yet, kindly add a manager.
                </h3>
            }
            
            <MiniFooter primaryVariant={true} />
        </>
    );
};

export default AdminInvestmentManagersCard