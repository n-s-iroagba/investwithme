import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PortfolioCard from './PortfolioCard';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';


const PortfolioComponent: React.FC = () => {
  const [investmentData, setInvestmentData] = useState({
    id: 1,
    commenceDate:'',
    amount: 2000,
    earnings: 1000,
    amountDeposited: 1800,
    durationInDays: 14,
    numberOfDeposits:0,
    wallet: {
      network: '',
      blockchain:'',
      address: '',
      currency: '',
    },
    dueDate: '',
    manager: {firstName:'al;jgdafa;l',lastName:'lafafapje'},
    dailyEarningPercentage: 140,
    referral: { totalAmount: 0, count: 0 },

  })

  const createMultiplicationObject = (commenceDate: string, number: number): Record<string, number> => {
    const startDate = new Date(commenceDate);
    const currentDate = new Date();
  
    const daysDifference = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Number of days between commence date and current date
  
    const resultObject: Record<string, number> = {};
  
    for (let i = 1; i <= daysDifference; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i - 1); // Set the date to the current day in the loop
      const key = currentDate.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format
      const value = number * i; // Calculate the value as multiplication of the number by the day index
      resultObject[key] = value;
    }
  
    return resultObject;
  };

  const formatStartDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  
  const formatEndDate = (dateString: string, numberOfDays: number): string => {
    const startDate = new Date(dateString);
    const endDate = new Date(startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
    return endDate.toLocaleDateString('en-GB');
  };



  Chart.register(...registerables)

  const chartObject =createMultiplicationObject(investmentData.commenceDate, investmentData.dailyEarningPercentage*investmentData.amountDeposited/100);
  const processedData = {
    labels: Object.keys(chartObject),
    datasets: [{
      label:'Porfolio Growth',
      data: Object.values(chartObject),
      backgroundColor: `#1a6e41`,
      height: '100%',
    }],
  };
 useEffect(()=>{
  setInvestmentData({
    id: 1,

    commenceDate: '2024-04-08T16:20:09Z',
    amount: 2000,
    earnings: 1000,
    amountDeposited: 1800,
    durationInDays: 14,
      numberOfDeposits:1,
    wallet: {
      network: 'erc',
      blockchain:'BTC',
      address: 'ala.flaejsqw;',
      currency: 'BTC',
    },
    dueDate: '', 
    manager: {firstName:'al;jgdafa;l',lastName:'lafafapje'},
    dailyEarningPercentage: 14,
    referral: { totalAmount: 444, count: 8},

  })
 }, [])

  return (<div className='w-100'>
  

    <Row className=''>
      <Col lg={6}>

        <PortfolioCard title={'Earnings'} mainText={`$${investmentData.earnings}`} subText={`${(1 + (investmentData.earnings / investmentData.amountDeposited)).toFixed(2)}X total amount invested`} primaryBackground={true} />

        <ReactChartJs type="line" data={processedData} />
      </Col>

      <Col xs={12} md={6} lg={3}>
  <div>
    <PortfolioCard
      title={'Total Amount Invested'}
      mainText={`$${investmentData.amountDeposited}`}
      subText={investmentData.amountDeposited !== 0 ? `Total investmentData amount: $${investmentData.amount}` : 'No investmentData deposit yet'}
      primaryBackground={true}
    />
    <PortfolioCard
      title={'Expected InvestmentData Earnings'}
      mainText={`$${(investmentData.amount * (investmentData.dailyEarningPercentage / 100) * investmentData.durationInDays).toFixed(2)}`}
      subText={investmentData.amountDeposited !== 0 ? `${((investmentData.amountDeposited * investmentData.durationInDays * investmentData.dailyEarningPercentage / 100) / investmentData.amountDeposited).toFixed(2)}X of portfolio amount ($${investmentData.amount})` : ''}
    />
    <PortfolioCard
      title={'Percentage earned'}
      mainText={investmentData.amountDeposited !== 0 ? `${(investmentData.earnings * 100 / investmentData.amountDeposited).toFixed(2)}%` : 'N/A'}
      subText={investmentData.amountDeposited !== 0 ? `In ${(Math.floor((new Date().getTime() - new Date(investmentData.commenceDate).getTime()) / (1000 * 60 * 60 * 24)))} days` : ''}
    />
  </div>
</Col>

<Col xs={12} md={6} lg={3}>
  <div>
    <PortfolioCard
      title={'Daily earning percentage'}
      mainText={investmentData.dailyEarningPercentage !== 0 ? `$${investmentData.dailyEarningPercentage}%` : 'No investmentData yet'}
      subText={investmentData.dailyEarningPercentage !== 0 ? `capital grows by ${1 + investmentData.dailyEarningPercentage / 14}X` : 'No investmentData yet'}
    />
    <PortfolioCard
      title={'Expected earning percentage'}
      mainText={investmentData.dailyEarningPercentage !== 0 ? `${investmentData.dailyEarningPercentage * investmentData.durationInDays}%` : 'No investmentData yet'}
      subText={investmentData.dailyEarningPercentage !== 0 ? 'In 14 days' : 'No investmentDatas yet'}
      primaryBackground={true}
    />
    <PortfolioCard title={'Start date'} mainText={formatStartDate(investmentData.commenceDate)} subText={investmentData.dailyEarningPercentage !== 0 ? 'Date of first deposit' : 'No investmentDatas yet'} primaryBackground={true} />
  </div>
</Col>

    </Row>
    <Row className='mx-1 green round-card-bottom mt-2 py-4'>

      <h4 className='text-center text-light'>Referral and Payout</h4>

      <Col xs={12} lg={4}>
        <div className='text-light  text-center'>Referral Bonus Earning:</div>
        <div className=' text-light  text-center'><strong>${investmentData.referral.totalAmount}</strong></div>
        <div className=' text-light  text-center'><small >from {investmentData.referral.count} referral</small></div>

      </Col>
      <Col xs={12} lg={4}>
        <div className='text-light  text-center'>Expected Total Payout:</div>
        <div className='text-light text-center'><strong>${`${investmentData.amount +(investmentData.amount*investmentData.dailyEarningPercentage * investmentData.durationInDays) }`}</strong></div>
        <div className=' text-light  text-center'><small >*Invested Capital + InvestmentData Earnings </small></div>

      </Col>
      <Col className='' xs={12} lg={4}>
        <div className='text-light text-center'>Pay Out Date:</div>
        <div className='text-light text-center '><strong>{formatEndDate(investmentData.commenceDate, investmentData.durationInDays)}</strong></div>
      </Col>


    </Row>
    <Row className='mx-1 border-0 border-top border-white text-light green pb-5 '>


      <h4 className='text-center text-light my-4 '>Other Details</h4>


      <Col xs={12} lg={4}>
        <div className='text-light text-center'>Payment Wallet BlockChain:</div>
        <div className='text-light   text-center pb-2'><strong>{investmentData.wallet.blockchain}</strong></div>

      </Col>
      <Col xs={12} lg={4}>
        <div className='text-light  text-center'>Payment Wallet Address:</div>
        <div className='text-light  text-center pb-2'><strong>{investmentData.wallet.address}</strong></div>

      </Col>
      <Col xs={12} lg={4}>
        <div className='text-light  text-center'>InvestmentData Manager:</div>
        <div className='text-light  text-center  pb-2'><strong>{investmentData.manager.firstName} {investmentData.manager.lastName}</strong></div>

      </Col>

    </Row>
  </div>
  );
};

export default PortfolioComponent;
