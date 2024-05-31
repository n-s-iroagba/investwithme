import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import { InvestmentTiersCard } from '../general/InvestmentTiersCard';
import { SelectManagerButton } from '../general/Button';
import { ManagerData } from '../../../../common/types';

import { sortManagers } from '../../utils/utils';
import { getManagers } from '../../utils/managerHelper';

const InvestmentCards: React.FC = () => {
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
        <div className='px-3'>
         {investmentData.length > 0?
         <>
            <Row className='gy-4'>
                <Col xs={12}>
                    <h3 className='text-center mt-5 mb-2'>
                        Select Your Fund Manager And Investment Tier
                    </h3>
                </Col>
                <div className='d-flex justify-content-evenly'>
                {investmentData.map((data, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
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
                </div>
            </Row>
            </>
            :''
}
        </div>
    );

}
export default InvestmentCards
