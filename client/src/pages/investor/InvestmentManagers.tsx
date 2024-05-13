import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import { MiniFooter } from '../../components/home_components/Footer';
import { ManagerType } from '../../utils/types';
import { SelectManagerButton } from '../../components/general/Button';
import { getManagers } from '../../utils/helpers';



const InvestmentManagers: React.FC = () => {
const [managers,setManagers] = useState<ManagerType[]>([])

useEffect(()=>{
    const fetchManagerData = async () => {
        try {
          const managerData = await getManagers(); 
          console.log(managerData)
          setManagers(managerData);
        } catch (error) {
          console.error(error);
          alert('You are not authorised to get managers')
        }
      };
  
      fetchManagerData(); 
    }, []);

    
   

    return (
        <div className='primary-background d-flex flex-column align-contents-center px-3 full-height'>
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Select Your Fund Manager And Investment Tier
                    </h3>
                </Col>
               <Row className='gx-2  gy-2 d-flex justify-content-center'>
                {
                managers.map((manager:ManagerType) => (
                <Col  key={manager.id} xs={12} md={6} lg={4}>
                    <InvestmentTiersCard
                        percentageYield={`${manager.percentageYield}%`}
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