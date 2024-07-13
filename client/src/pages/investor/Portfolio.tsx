import React, { useEffect, useState } from 'react';
import PortfolioLayout from '../../features/investment/layout/PortfolioLayout';
import { useNavigate } from 'react-router-dom';



import '../../common/styles/styles.css'
import { getInvestment } from '../../features/investment/helpers/investmentApiHelpers';
import { Manager } from '../../../../common/managerType';
import { PortfolioDto } from '../../features/investment/types/types';



const PortfolioWrapper:React.FC = ()=>{

    const [investmentData, setInvestmentData] = useState<PortfolioDto>({
      investment: {
        id: 1,
        investmentDate: new Date(),
        amount: 0,
        earnings: 0,
        amountDeposited: 0,
        isPaused: false
      } ,
      manager:{
        firstName: '',
        lastName: '',
        duration: 0,
        qualification: '',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      } as Manager,
    referrals: { totalAmount: 0, count: 0 },
  
    })

    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const investment = await getInvestment(1);
          localStorage.setItem('cassockInvestment','investment') //check if the user has invested else return empty object and promo pull should only be on the said day
          if (investment) {//handle not invested case and handle not promo due case
            setInvestmentData(investment.data);
          }
        } catch (error) {
          console.error('Error fetching investment data:', error);
        }
      };
  
      fetchData();
    }, []);
   
 return(
<div className='d-flex flex-column align-items-center'>
    <h1 className='text-center my-2'>My Portfolio</h1>
{investmentData.investment.amountDeposited===0 && <button className='mb-3 button-styles text-light button-width-narrow' onClick={()=>navigate('/invest/managers')}>Invest</button>
}
<PortfolioLayout investmentData={investmentData}/>
</div>

 )
 }
 export default PortfolioWrapper