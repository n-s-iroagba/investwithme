import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { InvestmentType } from '../../utils/types';
import PortfolioCard from './PortfolioCard';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';


const PortfolioComponent: React.FC = () => {
  const [investment, setInvestment] = useState({
    id: 1,

    commenceDate: new Date().toISOString(),
    amount: 2000,
    earnings: 1000,
    amountDeposited: 0, // Initialize before calculating deposits
    profit: 0, // Initialize before calculating profits
    wallet: {
      type: 'Savings',
      address: '1A1z2zX3zC4zV5vBqw',
    },
    dueDate: new Date(2024, 10, 31).toISOString(), // Adjust due date as needed
    deposits: [
      {
        date: new Date(2024, 10, 31).toISOString(), // Adjust deposit dates
        amount: 500,
      },
    ],
    investmentManager: 'Acme Investments',
    percentageYield: 140,

  })
  const [referral, setReferral] = useState({
    bonusAmount: 100,
  })
  Chart.register(...registerables)

  const device_counts = {
    "Desktop": 28,
    "Mobile": 36,
    "null": 11
  }
  const processedData = {
    labels: Object.keys(device_counts),
    datasets: [{
      data: Object.values(device_counts),
      backgroundColor: `#1a6e41`,
      height: '100%',
      hoverBackgroundColor: '#1a6e41'
    }]
  };


  return (<div className='mx-3'>
    <h1 className='text-center my-3'>My Portfolio</h1>

    <Row className=''>
      <Col lg={6}>

        <PortfolioCard title={'Earnings'} mainText={`$${investment.earnings}`} subText={`${1 + (investment.earnings / investment.amount)}X total amount invested`} primaryBackground={true} />

        <ReactChartJs type="line" data={processedData} />
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard title={'Total Amount Invested'} mainText={`$${investment.amount}`} subText='No deposits yet' primaryBackground={true} />
          <PortfolioCard title={'Expected Invesment Earnings'} mainText={`$${investment.amount * (investment.percentageYield / 100)}`} subText={`${1 + (investment.earnings / investment.amount)}X total amount invested`} />
          <PortfolioCard title={'Percentage earned'} mainText={`${(investment.earnings / investment.amount) * 100}%1`} subText='in X days' />
        </div>
      </Col>

      <Col xs={12} md={6} lg={3}>
        <div>
          <PortfolioCard title={'Daily earning percentage'} mainText={`$${investment.percentageYield / 14}%`} subText={`capital grows by ${1 + investment.percentageYield / 14}X`} />
          <PortfolioCard title={'Expected earning percentage'} mainText={`${investment.percentageYield}%`} subText='In 14 days' primaryBackground={true} />
          <PortfolioCard title={'Start date'} mainText={`23-03-2024`} subText='since first deposit' primaryBackground={true} />
        </div>
      </Col>
    </Row>
    <Row className='mx-1 green round-card-bottom mt-2 py-4'>

      <h4 className='text-center text-light'>Referrals and Payout</h4>



      <Col xs={12} lg={3}>
        <div className='text-light'>Referral Bonus:</div>
        <div className='text-light  pb-2'><strong>$300</strong></div>

      </Col>
      <Col xs={12} lg={3}>
        <div className='text-light'>Referral Bonus Earning:</div>
        <div className=' text-light  pb-2'><strong>$300</strong></div>

      </Col>
      <Col className='py-2'xs={12} lg={3}>
        <div className='text-light'>Total Payout:</div>
        <div className='text-light'><strong>$300</strong></div>
        <div className=' text-light'><small >*Invested Capital + Investment Earnings + Referral Bonus + Referral Bonus Earnings. </small></div>

      </Col>
      <Col className='py-2' xs={12} lg={3}>
        <div className='text-light'>Pay Out Date:</div>
        <div className='text-light '><strong>12-04-2024</strong></div>

      </Col>


    </Row>
    <Row className='mx-1 border-0 border-top border-white text-light green pb-5'>


      <h4 className='text-center text-light my-4 '>Other Details</h4>


      <Col xs={12} lg={4}>
        <div className='text-light'>Payment Wallet BlockChain:</div>
        <div className='text-light  pb-2'><strong>BINANCE</strong></div>

      </Col>
      <Col xs={12} lg={4}>
        <div className='text-light'>Payment Wallet Address:</div>
        <div className='text-light  pb-2'><strong>pa;RQE;ORJQWE;RK'W;ETIRKFQGW;IOR</strong></div>

      </Col>
      <Col xs={12} lg={4}>
        <div className='text-light'>Investment Manager:</div>
        <div className='text-light  pb-2'><strong>Annabel Kojovic</strong></div>

      </Col>

    </Row>
  </div>
  );
};

export default PortfolioComponent;
