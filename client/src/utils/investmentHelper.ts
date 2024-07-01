import { patchItem, postData } from "./api";
import { createInvestmentRoute, payUrl } from "./constants";
import { AddInvestmentType } from "./types";
import { extractErrorCode } from "./utils";




export const createInvestment = async (data:any,investorId:string) => {
    const createInvestmentUrl = `${createInvestmentRoute}/${investorId}`;
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      return await postData(createInvestmentUrl, data, authorizationData);
    }catch (error:any) {
      console.error(error)
      const code = extractErrorCode(error.message);
      if (code === 409) {
        alert('You have already made a previous investment, kindly check your mail for assistance')

       }else if (code === 400){
         alert('Some fields are missing, kindly fill the form properly and retry')
       }
      else {
        alert('Our server is currently down. Please try again later.');
      }
     }
  };
  

  export const addInvestment =async (data:AddInvestmentType) =>{
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      const response = await patchItem(payUrl,data,authorizationData);
      if (response.status === 200) {
        alert('investment deposit successfully added succesfully')
        window.location.reload();
    }
  }catch (error:any) {
   console.error(error)
   const code = extractErrorCode(error.message);
    if (code === 400){
      alert('Some fields are missing, kindly fill the form properly and retry')
    }
   else {
    alert('unable to add investment amount at this time')
   }
  }
  }