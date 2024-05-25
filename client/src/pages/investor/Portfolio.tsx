import React, { useEffect, useState } from 'react';
import PortfolioComponent from '../../components/investor/PortfolioComponent';
import { useNavigate } from 'react-router-dom';



const Portfolio:React.FC = ()=>{

    const [investmentData, setInvestmentData] = useState({
      investment: {
        id: 1,
        investmentDate: new Date().toDateString(),
        amount: 0,
        earnings: 0,
        amountDeposited: 0,
        durationInDays: 14,
        incrementPercent: 0,
        dueDate: '',
      },
      wallet: {
        id:0,
        network: '',
        blockchain: '',
        address: '',
        currency: '',
      },
      manager: { firstName: '', lastName: '' },
  
      referrals: { totalAmount: 0, count: 0 },
  
    })
  
    const navigate = useNavigate()

    useEffect(() => {
      const investment = localStorage.getItem('cassockInvestment')
      console.log(investment)
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
 export default Portfolio