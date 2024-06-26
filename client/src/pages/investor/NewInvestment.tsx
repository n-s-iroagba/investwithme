import React from "react";
import NewInvestmentForm from "../../components/forms/NewInvestmentForm";
import Information from "../../components/general/Information";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { MiniFooter } from "../../components/home_components/Footer";

const NewInvestment:React.FC<{username:string,}> = ({username})=>{

    return(
         <div className='px-4 py-4 d-flex flex-column align-items-center'>
    <div className='auth-page-items'>
 
          <Information center= {true}text='Fill the form below to get started.' head='Create a portfolio' icon={faHandHoldingDollar} />
        <NewInvestmentForm username={username}/>
        <MiniFooter/>
        </div>
        </div>
    )
}
export default NewInvestment;