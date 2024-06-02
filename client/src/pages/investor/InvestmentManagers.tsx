import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import { MiniFooter } from '../../components/home_components/Footer';
import { ManagerData } from '../../../../common/types';
import { SelectManagerButton } from '../../components/general/Button';
import { getManagers } from '../../utils/managerHelper';
import ErrorMessage from '../../components/general/ErrorMessage';



const InvestmentManagers: React.FC = () => {
const [managers,setManagers] = useState<ManagerData[]>([])
const [errorMessage, setErrorMessage]=useState('')

useEffect(()=>{
        const fetchManagerData = async () => {
          try {
            const managerData = await getManagers(); 
            managerData && setManagers(managerData);
          } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while fetching managers. Please try again later.'); 
          }      
        }
  
      fetchManagerData(); 
    }, []);

    return (
        <div className='primary-background'>
        <div className='d-flex flex-column align-items-center px-3 full-height'>
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        { managers.length?  'Select Your Fund Manager And Investment Tier':'No investment Manager Availble at this time.'}
                    </h3>
                </Col>
               <Row className='gx-2  gy-2 d-flex justify-content-center'>
                {managers.length&&managers.map((manager:ManagerData) => (
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
            </div>
            <ErrorMessage message={errorMessage} />
            <MiniFooter primaryVariant={true} />
        </div>
    );
};

export default InvestmentManagers