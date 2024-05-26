import React, { useEffect, useState } from "react";
import '../../components/styles.css'
import Header from "../../components/home_components/Header";
import {TickerTape, } from "react-ts-tradingview-widgets";
import Steps from "../../components/home_components/Steps";

import SecurityAssurance from "../../components/home_components/SecurityAssurance";
import Contact from "../../components/home_components/Contact";
import Testimonial from "../../components/home_components/Testimonial";
import Awards from "../../components/home_components/Awards";
import OfficeMap from "../../components/home_components/OfficeMap";
import Introduction from "../../components/home_components/Introduction";
import Footer from "../../components/home_components/Footer";
import Counter from "../../components/home_components/Counter";
import Referrals from "../../components/home_components/Referrals";
import Chart from "../../components/home_components/Chart";
import Promo from "../../components/home_components/Promo";
import InvestmentCards from "../../components/home_components/InvestmentCards";
import { PromoType } from "../../utils/types";
import { getPromo } from "../../utils/promoHepler";

const Home:React.FC = ()=>{
const [promo,setPromo] = useState <PromoType|null>(null)
useEffect(()=>{
    const fetchPromoData = async () => {
        try {
          const receivedpromo = await getPromo();
          
          receivedpromo && setPromo(receivedpromo);
        
        } catch (error) {
          console.error('Error fetching promo:', error);
        
       
        }
      };
      fetchPromoData();
    },[])
    return <div>
        <Header/>
        <TickerTape colorTheme="light"/>
         <Introduction/>
         <Counter/>
         <Testimonial/>
         <Awards/>
         <SecurityAssurance/>
         <Steps/>

        {promo && <Promo promo= {promo}/>}
         <InvestmentCards/>
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