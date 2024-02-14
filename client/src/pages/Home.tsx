import React from "react";
import '../assets/Styles.css'
import Header from "../components/Header";
import { TickerTape } from "react-ts-tradingview-widgets";
import IntroductoryComponent from "../components/IntroductoryComponent";

import SecurityAssurance from "../components/SecurityAssurance";
import InvestmentTiers from "../components/InvestmentTiers";
import NewsWidget from "../components/NewsWidget";
import Contact from "../components/Contact";
import Testimonial from "../components/Testimonial";
import Awards from "../components/Awards";
import OfficeMap from "../components/OfficeMap";
import Introduction from "../components/Introduction";
import Footer from "../components/Footer";
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
        <Contact/>
        <NewsWidget/>
        <OfficeMap apiKey={apiKey} />
        <Footer/>
        </div>


}
export default Home