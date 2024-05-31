import { deleteItem, getData, patchItem, postData,} from "./api";
import { AddInvestmentType, } from "./types";

import {
  getPendingReferralUrl,
  getInvestorsUrl,
  getReferralDetailsRoute,
 getPendingBonusUrl,
createInvestmentRoute,  payUrl,
 deleteInvestorRoute, payReferralRoute,
  payBonusRoute, getTransactionsRoute,
   getNotificationsRoute, getInvestmentRoute, 
  getInvestmentStatusRoute, 
  markNotificationsRoute
} from "./constants";

export const createInvestment = async (data:any,investorId:string) => {
  const createInvestmentUrl = `${createInvestmentRoute}/${investorId}`;
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    return await postData(createInvestmentUrl, data, authorizationData);
  }catch (error:any) {
    console.error(error)
    alert('sorry investments can not be made at this time, kindly come back later')
   }
};


export const deleteInvestor = async (id:number)=>{
  const url =`${deleteInvestorRoute}/${id}`
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await deleteItem(url,authorizationData);
    if (response.status === 200) {
      alert('promo deleted succesfully')
      window.location.reload();
  }
  return response.status
}catch (error:any) {
 console.error(error)
  alert('unable to delete promo at this time')
}
}

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
  alert('unable to add investment amount at this time')
}
}

export const payReferral = (id:number)=>{
  const url = `${payReferralRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = getData(url, authorizationData);
  if (response.status ===200)
  alert('referral successfully paid')
  window.location.reload();
  }catch(error:any){
    console.error(error)
   alert('unable to pay referral at this time')
  }
}
export const payPromoBonus = (id:number)=>{
  const url = `${payBonusRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = getData(url, authorizationData);
  if (response.status ===200){
    alert('promo bonus successfully paid')
    window.location.reload();
  }
  }catch(error:any){
    console.error(error)
   alert('unable to pay promo bonus at this time')
  }
}

export const getTransactions = async (id:number)=>{
  const url = `${getTransactionsRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
    const response:any = await getData(url, authorizationData);
    if (response.status ===200){
    return response.data
    }
    return []
    }catch(error:any){
      console.error(error)
      alert('unable to get transactions at this time')
    }
}
export const getInvestment = async (id:number)=>{
  const url = `${getInvestmentRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
    const response:any = await getData(url, authorizationData);
    return response
    }catch(error:any){
      console.error(error)
      alert('unable to get investment data at this time')
    }
}

export const getInvestmentStatus = async (id:string)=>{
  const url = `${getInvestmentStatusRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
    const response:any = await getData(url, authorizationData);
    console.log(response.data)
    if (response.status ===200){
    return response.data
    }
    }catch(error:any){
      console.error(error)
    }
}
export const getNotifications = async (id:number)=>{
  const url = `${getNotificationsRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
    const response:any = await getData(url, authorizationData);
  
    if (response.status ===200){
    return response.data
    }
    return []
    }catch(error:any){
      console.error(error)
    
    }
}
export const logOut = (navigate:(path:string)=>void)=>{
  localStorage.removeItem('cassockJwtToken')
  localStorage.removeItem('cassockId')
 navigate('/')
}

export const markNoficationsAsRead= async (id:number)=>{
  const url = `${markNotificationsRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
   const response = await getData(url,authorizationData)
   if (response.status ===200){
    return
    }else{
      console.log(response)
    }
}

export const getBonus = async () =>{
  const url = getPendingBonusUrl
  const authorizationData = localStorage.getItem('cassockJwtToken');
   const response = await getData(url,authorizationData)
   if (response.status ===200){
    return response.data
    }
      return []

}

export const getUnpaidReferrals = async()=>{
  const url = getPendingReferralUrl
  const authorizationData = localStorage.getItem('cassockJwtToken');
   const response = await getData(url,authorizationData)
   if (response.status ===200){
    return response.data
   }
     return   []
}

export const getInvestors = async ()=>{
  const url = getInvestorsUrl
  const authorizationData = localStorage.getItem('cassockJwtToken');
   const response = await getData(url,authorizationData)
   if (response.status ===200){
    return response.data
   }
     return   []
}
export const getReferralDetails =async (id:number)=>{
  const url = `${getReferralDetailsRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
   const response = await getData(url,authorizationData)
   if (response.status ===200){
    return  response.data
   }
     return null
}

export const getNewbies:()=>string[]=() =>{
  return ['referral']
}






