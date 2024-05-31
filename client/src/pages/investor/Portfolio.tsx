import React, { useEffect, useState } from 'react';
import PortfolioComponent from '../../components/investor/PortfolioComponent';
import { useNavigate } from 'react-router-dom';
import { Portfolio } from '../../../../common/types';
import { Investment } from '../../../../server/src/types/investorTypes';



const PortfolioWrapper:React.FC = ()=>{

    const [investmentData, setInvestmentData] = useState<Portfolio>({
      investment: {
        id: 1,
        investmentDate: new Date(),
        amount: 0,
        earnings: 0,
        amountDeposited: 0,
        isPaused: false
      } as unknown as Investment,
      manager:{
        id: 0,
        firstName: '',
        lastName: '',
        image: '',
        duration: 0,
        qualification: '',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      },
    referrals: { totalAmount: 0, count: 0 },
  
    })
  
    const navigate = useNavigate()

    useEffect(() => {
      const investment = localStorage.getItem('cassockInvestment')
      if (investment) {
        setInvestmentData(JSON.parse(investment))
      }
    }, [])

   
 return(
<div className='d-flex flex-column align-items-center'>
    <h1 className='text-center my-2'>My Portfolio</h1>
{investmentData.investment.amountDeposited===0 && <button className='mb-3 button-styles text-light button-width-narrow' onClick={()=>navigate('/invest/managers')}>Invest</button>
}
<PortfolioComponent investmentData={investmentData}/>
</div>

 )
 }
 export default PortfolioWrapper