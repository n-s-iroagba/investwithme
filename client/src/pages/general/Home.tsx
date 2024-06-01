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
import { Button, Modal } from "react-bootstrap";
import image from '../../assets/awards/US Certificate of Incorporation.jpg'
import '../../components/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
const Home:React.FC = ()=>{
const [promo,setPromo] = useState <PromoType|null>(null)
const [isModalOpen, setIsModalOpen] = useState(false);


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
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return <div>
        <Header/>
        <TickerTape colorTheme="light"/>
         <Introduction/>
         <Counter/>
         <Testimonial/>
         <Awards/>
         <SecurityAssurance/>
       

        {promo && <Promo promo= {promo}/>}
         <InvestmentCards text={'Select your investment tier and porfolio manager'}/>
         <div className="d-flex flex-column align-items-center">
         {!isModalOpen?(
      <button className='button-styles button-width-narrow px-3' onClick={handleOpenModal}>
        <div>View Certificate of Incorporation</div>
        <div>
          <FontAwesomeIcon icon={faFile} beatFade />
        </div>
      </button>
         ):
      (<div>
             <Modal.Dialog className='d-flex flex-column'>
             <Modal.Header>
               <Modal.Title>Certificate of Incoporation</Modal.Title>
             </Modal.Header>
     
             <Modal.Body>
             <img className='certificate-image' src={image} alt='Certificate of Incorporation' />
             </Modal.Body>
     
             <Modal.Footer className="d-flex justify-content-center">
               <Button onClick={handleCloseModal} variant="secondary">Close</Button>
             
             </Modal.Footer>
           </Modal.Dialog>
           </div>
      )}
    </div>
    <Steps/>
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