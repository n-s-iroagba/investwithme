import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PortfolioCard from './PortfolioCard';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';
import { createMultiplicationObject, formatEndDate, formatStartDate } from '../../utils/utils';

const PortfolioComponent: React.FC<{ investmentData: any }> = ({ investmentData }) => {
  Chart.register(...registerables)

  const chartObject = createMultiplicationObject(investmentData.investment.investmentDate, 1);

  const processedData = {
    labels: Object.keys(chartObject),
    datasets: [{
      label: 'Porfolio Growth',
      data: Object.values(chartObject),
      backgroundColor: `#1a6e41`,
      height: '100%',
    }],
  };
 
const expectedEarnings = (mangerIncrementPercent:number)=>{
  const amount =  investmentData.investment.amountDeposited
  // investmentData.investment.amount < investmentData.investment.amountDeposited
  //   ? investmentData.investment.amountDeposited
  //   : investmentData.investment.amount;

  const incrementPercent = mangerIncrementPercent / 100;
  const investmentValue = amount * ( incrementPercent);

  return investmentValue.toFixed(2)
}
const expectedEarningsPercentage = (mangerIncrementPercent:number)=>{
  const amount = investmentData.investment.amount < investmentData.investment.amountDeposited
    ? investmentData.investment.amountDeposited
    : investmentData.investment.amount;

 
    const incrementPercent = mangerIncrementPercent/ 100;
    const investmentValue = amount * ( incrementPercent);
 const earningPercent = (investmentValue/amount)
  return earningPercent.toFixed(2)
}
const dailyEarningPercentage =(incrementPercent:number,durationIndays:number)=>{
  const dailyPercentage = incrementPercent/durationIndays
  return dailyPercentage.toFixed(2)
}
 //${(Math.floor((new Date().getTime() - new Date(investmentData.investment.investmentDate).getTime()) / (1000 * 60 * 60 * 24)))


  return (<div className='w-100'>


    <Row className=''>
      <Col lg={6}>
        <PortfolioCard title={'Earnings'}
         mainText={`$${investmentData.investment.earnings}`} 
         subText={investmentData.investment.earnings > 0 ? `${(investmentData.investment.earnings * 100 / investmentData.investment.amountDeposited).toFixed(2)}%  
         In ${(Math.floor((new Date().getTime() - new Date(investmentData.investment.investmentDate).getTime()) / (1000 * 60 * 60 * 24)))} days`  : `no earnings yet.`}
          primaryBackground={true} />
        <ReactChartJs type="line" data={processedData} />
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard
            title={'Total Amount Invested'}
            mainText={`$${investmentData.investment.amountDeposited}`}
            subText={investmentData.investment.amountDeposited !== 0 ? `Portfolio value: $${investmentData.investment.amount} 
            ` : 'No investment yet'}
            primaryBackground={true}
          />
          <PortfolioCard
            title={'Expected Investment Earnings'}
            mainText={investmentData.investment.amountDeposited !== 0 ?`$${expectedEarnings(investmentData.manager.percentageYield)}`:'0%'}
            subText={investmentData.investment.amountDeposited !== 0 ? `${expectedEarningsPercentage(investmentData.manager.percentageYield)}X of amount deposited.` : 'No Investment yet.'}
          />
          <PortfolioCard
            title={'Total Payout'}
            mainText={investmentData.investment.amountDeposited !== 0 ? `$ ${investmentData.investment.amountDeposited
             // investmentData.investment.amount?investmentData.investment.amountDeposited:investmentData.investment.amount
            
            }+${expectedEarnings(investmentData.manager.percentageYield)}` : '0%'}
            subText={investmentData.investment.amountDeposited !== 0 ? `In ${investmentData.manager.duration*7} days` : 'No investment yet'}
          />
        </div>
       
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard
            title={'Daily earning percentage'}
            mainText={investmentData.investment.incrementPercent !== 0 ? `$${dailyEarningPercentage(investmentData.manager.percentageYield,investmentData.manager.duration*7)}%` : '0%'}
            subText={investmentData.investment.incrementPercent !== 0 ? `capital grows by ${dailyEarningPercentage(investmentData.manager.percentageYield,investmentData.manager.duration*7)}X daily` : 'No investment yet'}
          />
          <PortfolioCard title={'Start date'} mainText={investmentData.investment.amountDeposited !== 0 ?formatStartDate(investmentData.investment.investmentDate):'N/A'} subText={investmentData.investment.incrementPercent !== 0 ? 'Date of first deposit' : 'No investment yet'} primaryBackground={true} />
        
          <PortfolioCard
            title={'Pay Out Date'}
            mainText={investmentData.investment.incrementPercent !== 0 ? `${investmentData.investment.amountDeposited !== 0 ?formatEndDate(investmentData.investment.investmentDate,investmentData.manager.duration*7):'N/A'}` : 'N/A'}
            subText={investmentData.investment.incrementPercent !== 0 ? `investment tenure of ${investmentData.investment.durationIndays} days` : 'No investment yet'}
            primaryBackground={true}
          />
        </div>
      </Col>

    </Row>
    <Row className='mx-1 green round-card-bottom mt-2  gy-3 py-4'>

    

      <h4 className='text-center text-light my-4 '>Other Details</h4>

      <Col xs={12} md={6}>
        <div className='text-light  text-center'>Referral Bonus Earning:</div>
        <div className=' text-light  text-center'><strong>${investmentData.referrals.totalAmount}</strong></div>
        <div className=' text-light  text-center'><small >from {investmentData.referrals.count} referrals</small></div>

      </Col>
      <Col xs={12} md={6}>
        <div className='text-light  text-center'>Investment Manager:</div>
        <div className='text-light  text-center'><strong>{investmentData.manager.firstName} {investmentData.manager.lastName}</strong></div>

      </Col>

    </Row>
  </div>
  );
};

export default PortfolioComponent;
