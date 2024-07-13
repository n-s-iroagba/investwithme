import React, { useEffect, useState } from "react";
import Promo from "../components/Promo";
import { getPromo } from "../../promo/helpers/promoApiHelpers";
import { PromoDto } from "../../../../../common/promoTypes";


const PromoAdvert:React.FC = () =>{
    const [promo,setPromo] = useState <PromoDto|null>(null)



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


    return(
        <>
        {
            promo?   <Promo promo= {promo}/>: ''
        }
        </>
    )
        
    
}

export default PromoAdvert