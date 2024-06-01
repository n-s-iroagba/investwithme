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
        <div className='d-flex flex-column align-items-center' >
         {investmentData.length > 0?
         <>
        
                    <h3 className='text-center mt-5 '>
                       {text}
                    </h3>
                    {text && <div className='primary-line mb-4'/>}
         
                    <Row>
               
            
                {investmentData.map((data, index) => (
                    <Col className=' w-100' key={index} xs={12} md={6} lg={4}>
                        <InvestmentTiersCard
                            percentageYield={`${data.percentageYield}%`}
                            image={data.image}
                            firstName={data.firstName}
                            lastName={data.lastName}
                            qualification={data.qualification}
                            minimumInvestmentAmount={`$${data.minimumInvestmentAmount}`}
                            duration={`${data.duration} weeks`}
                            button={<SelectManagerButton managerId={data.id} />}
                        />
                    </Col>
                ))}
         
            </Row>
            </>
            :''
}
        </div>
    );

}
export default InvestmentCards
