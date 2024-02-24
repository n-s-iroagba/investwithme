import React, { useEffect, useState } from "react";
import '../assets/Styles.css'
import Header from "../components/Header";
import {TickerTape, } from "react-ts-tradingview-widgets";
import Steps from "../components/Steps";

import SecurityAssurance from "../components/SecurityAssurance";
import InvestmentTiers from "../components/InvestmentTiers";
import Contact from "../components/Contact";
import Testimonial from "../components/Testimonial";
import Awards from "../components/Awards";
import OfficeMap from "../components/OfficeMap";
import Introduction from "../components/Introduction";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import Referrals from "../components/Referrals";
import Chart from "../components/Chart";
import Promo from "../components/Promo";

const Home:React.FC = ()=>{

    return <div>
        <Header/>
        <TickerTape colorTheme="light"/>
         <Introduction/>
         <Counter/>
         <Testimonial/>
         <Awards/>
         <SecurityAssurance/>
         <Steps/>
         <Promo/>
         <InvestmentTiers/>
         <Referrals/>
         <Chart/>
         <Contact/>
         <OfficeMap />
         <Footer/> 
         
        {/*
      
        
       
     
       
        
       */}
        </div>


}
export default Home