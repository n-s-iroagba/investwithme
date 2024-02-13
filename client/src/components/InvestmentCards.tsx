import React from 'react';
import {Row,Col} from 'react-bootstrap'
import { InvestmentTiersCard } from './InvestmentTiers';
const InvestmentCards:React.FC = ()=>{
    return <Row>
        <Col>Select Your Fund Manager And Investement Tier</Col>
        <Col xs={12} lg={4}>
        <InvestmentTiersCard
         title="150% RETURNS"
         image="https://via.placeholder.com/150"
         name="Anna Glasgow"
         minDeposit="500"
         maxDeposit="10000"
         duration="1 year"
        />
        </Col>
        <Col xs={12} lg={4}>
        <InvestmentTiersCard
         title="150% RETURNS"
         image="https://via.placeholder.com/150"
         name="Anna Glasgow"
         minDeposit="500"
         maxDeposit="10000"
         duration="1 year"
        />
        </Col>
    </Row>
}
export default InvestmentCards