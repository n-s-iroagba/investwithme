import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PortfolioCard from './PortfolioCard';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';
import { createMultiplicationObject, formatEndDate, formatStartDate } from '../../utils/utils';

const PortfolioComponent: React.FC<{ investmentData: any }> = ({ investmentData }) => {
  Chart.register(...registerables)

  const chartObject = createMultiplicationObject(investmentData.investment.investmentDate, investmentData.investment.incrementPercent * investmentData.investment.amountDeposited / 100);

  const processedData = {
    labels: Object.keys(chartObject),
    datasets: [{
      label: 'Porfolio Growth',
      data: Object.values(chartObject),
      backgroundColor: `#1a6e41`,
      height: '100%',
    }],
  };
 
const expectedEarnings = ()=>{
  const amount = investmentData.investment.amount < investmentData.investment.amountDeposited
    ? investmentData.investment.amountDeposited
    : investmentData.investment.amount;

  const incrementPercent = investmentData.investment.incrementPercent / 100;
  const investmentValue = amount * (1 + incrementPercent);

  return investmentValue.toFixed(2)
}
const expectedEarningsPercentage = ()=>{
  const amount = investmentData.investment.amount < investmentData.investment.amountDeposited
    ? investmentData.investment.amountDeposited
    : investmentData.investment.amount;

 
    const incrementPercent = investmentData.investment.incrementPercent / 100;
    const investmentValue = amount * (1 + incrementPercent);
 const earningPercent = (investmentValue/amount)
  return earningPercent.toFixed(2)
}
const dailyEarningPercentage =()=>{
  const dailyPercentage = investmentData.investment.durationIndays/investmentData.investment.incrementPercent
  return dailyPercentage.toFixed(2)
}



  return (<div className='w-100'>


    <Row className=''>
      <Col lg={6}>
        <PortfolioCard title={'Earnings'}
         mainText={`$${investmentData.investment.earnings}`} 
         subText={investmentData.investment.earnings > 0 ? `${(1 + (investmentData.investment.earnings / investmentData.investment.amountDeposited)).toFixed(2)}X total amount invested` : `no earnings yet.`}
          primaryBackground={true} />
        <ReactChartJs type="line" data={processedData} />
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard
            title={'Total Amount Invested'}
            mainText={`$${investmentData.investment.amountDeposited}`}
            subText={investmentData.investment.amountDeposited !== 0 ? `Total amount deposited: $${investmentData.investment.amount}` : 'No investment yet'}
            primaryBackground={true}
          />
          <PortfolioCard
            title={'Expected Investment Earnings'}
            mainText={investmentData.investment.amountDeposited !== 0 ?`$${expectedEarnings()}`:'0%'}
            subText={investmentData.investment.amountDeposited !== 0 ? `${expectedEarningsPercentage()}X of total portfolio` : 'No Investment yet'}
          />
          <PortfolioCard
            title={'Percentage earned'}
            mainText={investmentData.investment.amountDeposited !== 0 ? `${(investmentData.investment.earnings * 100 / investmentData.investment.amountDeposited).toFixed(2)}%` : '0%'}
            subText={investmentData.investment.amountDeposited !== 0 ? `In ${(Math.floor((new Date().getTime() - new Date(investmentData.investment.investmentDate).getTime()) / (1000 * 60 * 60 * 24)))} days` : 'No investment yet'}
          />
        </div>
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard
            title={'Daily earning percentage'}
            mainText={investmentData.investment.incrementPercent !== 0 ? `$${dailyEarningPercentage()}%` : '0%'}
            subText={investmentData.investment.incrementPercent !== 0 ? `capital grows by ${dailyEarningPercentage()}X daily` : 'No investment yet'}
          />
          <PortfolioCard title={'Start date'} mainText={investmentData.investment.amountDeposited !== 0 ?formatStartDate(investmentData.investment.investmentDate):'N/A'} subText={investmentData.investment.incrementPercent !== 0 ? 'Date of first deposit' : 'No investment yet'} primaryBackground={true} />
        
          <PortfolioCard
            title={'Pay Out Date'}
            mainText={investmentData.investment.incrementPercent !== 0 ? `${investmentData.investment.amountDeposited !== 0 ?formatEndDate(investmentData.investment.investmentDate,investmentData.investment.durationIndays):'N/A'}` : 'N/A'}
            subText={investmentData.investment.incrementPercent !== 0 ? `investment tenure of ${investmentData.investment.durationIndays} days` : 'No investment yet'}
            primaryBackground={true}
          />
        </div>
      </Col>

    </Row>
    <Row className='mx-1 green round-card-bottom mt-2  gy-3 py-4'>

    

      <h4 className='text-center text-light my-4 '>Other Details</h4>

      <Col xs={12} md={6} lg={3}>
        <div className='text-light  text-center'>Referral Bonus Earning:</div>
        <div className=' text-light  text-center'><strong>${investmentData.referrals.totalAmount}</strong></div>
        <div className=' text-light  text-center'><small >from {investmentData.referrals.count} referrals</small></div>

      </Col>
      <Col xs={12} md={6} lg={3}>
        <div className='text-light text-center'>Payment Wallet BlockChain:</div>
        <div className='text-light   text-center'><strong>{investmentData.wallet.blockchain}</strong></div>

      </Col>
      <Col xs={12} md={6} lg={3}>
        <div className='text-light  text-center'>Payment Wallet Address:</div>
        <div className='text-light  text-center'><strong>{investmentData.wallet.address}</strong></div>

      </Col>
      <Col xs={12} md={6} lg={3}>
        <div className='text-light  text-center'>Investment Manager:</div>
        <div className='text-light  text-center'><strong>{investmentData.manager.firstName} {investmentData.manager.lastName}</strong></div>

      </Col>

    </Row>
  </div>
  );
};

export default PortfolioComponent;
