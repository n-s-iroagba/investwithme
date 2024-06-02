import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import { InvestmentTiersCard } from '../general/InvestmentTiersCard';
import { SelectManagerButton } from '../general/Button';
import { ManagerData } from '../../../../common/types';

import { sortManagers } from '../../utils/utils';
import { getManagers } from '../../utils/managerHelper';

const InvestmentCards: React.FC<{text?:string}> = ({text}) => {
const [investmentData,setInvestementData] = useState<ManagerData[]>([])
useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers(); 
        const sortedManagers = sortManagers( managerData)
        setInvestementData(sortedManagers);

        console.log(managerData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchManagerData(); // Call the async function to fetch data
  }, []);
   

    return (
    <>
      <div className='d-flex flex-column align-items-center'>
       
                  <h3 className='text-center mt-4'>
                      {text}
                  </h3>
                  {text&&<div className='primary-line mb-4'/>}
            </div>
             <Row className='gx-2 gy-2 d-flex justify-content-center'>
              {investmentData.length&&investmentData.map((manager:ManagerData) => (
              <Col  key={manager.id} xs={12} md={6} lg={3}>
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
             
                  </>
  );
}
export default InvestmentCards
