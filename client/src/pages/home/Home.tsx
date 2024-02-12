import React from "react";
import './Home.css'
import Header from "../../components/header/Header";
import { TickerTape } from "react-ts-tradingview-widgets";
import IntroductoryComponent from "../../components/IndtroductoryComponent/IntroductoryComponent";

import SecurityAssurance from "../../components/security_assurance/SecurityAssurance";
import InvestmentTiers from "../../components/investment_tiers/InvestmentTiers";
import NewsWidget from "../../components/widgets/NewsWidget";

import Testimonial from "../../components/testimonial/Testimonial";
import Awards from "../../components/awards/Awards";
import OfficeMap from "../../components/office_map/OfficeMap";
import Introduction from "../../components/Introduction/Introduction";
const apiKey = 'AIzaSyA0xYlirjxVjWxuNxww8eh3ydX0n9wqLQ8'
const Home:React.FC = ()=>{
    return <div>
        <Header/>
        <TickerTape colorTheme="dark"/>
        <Introduction/>
        <Awards/>
        <IntroductoryComponent/>
        <SecurityAssurance/>
        <Testimonial/>
        <InvestmentTiers/>
      
        <NewsWidget/>
       
        <OfficeMap apiKey={apiKey} />
        </div>


}
export default Home