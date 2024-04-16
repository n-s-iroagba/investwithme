import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import { MiniFooter } from '../../components/home_components/Footer';
import { ManagerType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { getManagers } from '../../utils/helpers';

export const SelectManagerButton: React.FC<{ managerId?: number }> = ({ managerId }) => {
    const navigate = useNavigate();

    const handleInvestClick = () => {
        localStorage.setItem('cassockNewInvestmentInitmanagerId', JSON.stringify(managerId));
        navigate('/invest');
    };

    return (
        <button onClick={handleInvestClick} className='button-styles'>
            Invest with this Manager
        </button>
    );
};

const InvestmentManagers: React.FC = () => {
const [managers,setManagers] = useState<ManagerType[]>([])

useEffect(()=>{
    const retrievedManagers:ManagerType[] = getManagers()
    setManagers(retrievedManagers)

}, [])
    
   

    return (
        <div className='primary-background d-flex flex-column align-contents-center px-3 full-height'>
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Select Your Fund Manager And Investment Tier
                    </h3>
                </Col>
               <Row className='gx-2  gy-2 d-flex justify-content-center'>
                {managers.map((manager) => (
                <Col  key={manager.id} xs={12} md={6} lg={4}>
                    <InvestmentTiersCard
                        percentageYield={`${manager.percentageYield}% RETURN ON INVESTMENT`}
                        image={manager.image}
                        firstName={manager.firstName}
                        lastName={manager.lastName}
                        qualification={manager.qualification}
                        minimumInvestmentAmount={`$${manager.minimumInvestmentAmount}`}
                        duration={`${manager.duration} weeks`}
                        button={<SelectManagerButton managerId={manager.id} />}
                    />
                </Col>
                ))}
                </Row>
            </Row>
            <MiniFooter primaryVariant={true} />
        </div>
    );
};

export default InvestmentManagers