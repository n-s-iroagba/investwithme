import { deleteItem, getData, patchFormDataItem, patchItem, postData,postFormData } from "./api";
import { AddInvestmentType, CreatePromoType, CreateWalletType, WalletType } from "./types";
import { ManagerData } from "../../../common/types";
import { getNewbiesAdminUrl, createManagerUrl, getPendingReferralUrl,getInvestorsUrl,getReferralDetailsRoute,
  patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, getPendingBonusUrl,
  deleteWalletRoute, createInvestmentRoute, getManagersUrl, getWalletsUrl, getPromoUrl, createPromoUrl, 
  patchPromoUrl, deletePromoRoute, payUrl, deleteInvestorRoute, payReferralRoute, payBonusRoute, getSingleMangerRoute, getTransactionsRoute, getNotificationsRoute, getInvestmentRoute, 
  getInvestmentStatusRoute, markNotificationsRoute} from "./constants";

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

export const getAdminNewbies = async ()=>{
  try {

    const authorizationData = localStorage.getItem('cassockJwtToken');

    const response = await getData(getNewbiesAdminUrl,authorizationData);
 
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
    
  } catch (error: any) {
    console.error(error);
    return error
  
  }
};
  
export const createManager= async (data:FormData) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postFormData(createManagerUrl, data, authorizationData);
    if (response.status === 201) {
    alert('manager added succesfully')
    window.location.reload();
  } 
}catch (error:any) {
  console.error(error)
  alert('unable to create a manager at this time')
 }

};

export const getManagers = async (): Promise<ManagerData[]> => {
  try {

    const authorizationData = localStorage.getItem('cassockJwtToken');

    const response = await getData(getManagersUrl,authorizationData);
 
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data as ManagerData [];
    }

    return [];
    
  } catch (error: any) {
    console.error(error);
    return error
  
  }
};



export const getSingleManager = async (id:string)=>{
  const getSingleMangerUrl = `${getSingleMangerRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response = await getData(getSingleMangerUrl,authorizationData);
  if (response.status ===200){
  return response.data
  }
  }catch(error:any){
    console.error(error)
    alert('unable to fetch the manager you wish to update at this time')
  }
}

export const patchManager=async ( data:FormData,navigate:(path:string)=>void,id:number) =>{
  console.log('id is' +id)
  const url = `${patchManagerUrl}/${id}`
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchFormDataItem(url, data, authorizationData);
    if (response.status === 200) {
      alert('manager updated succesfully')
     navigate('/admin/managers')
    } 
}catch (error:any) {
  console.error(error)
  alert('unable to update the manager at this time')
}
}

export const deleteManager = async (id:number) => {
const url =`${deleteManagerRoute}/${id}`
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await deleteItem(url,authorizationData);
    if (response.status === 200) {
      alert('manager deleted succesfully')
      window.location.reload();
  } 
}catch (error:any) {
  console.error(error)
  alert('unable to delete manager at this time')
 }
}

export const createWallet= async (data:CreateWalletType) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
    const response = await postData(createWalletUrl, data, authorizationData);
    if (response.status === 201) {
    alert('wallet added succesfully')
    window.location.reload();
  } 
}catch (error:any) {
  console.error(error)
  alert('unable to create a wallet at this time')
 }
};

export const getAdminWallets = async ()=>{

  const authorizationData = localStorage.getItem('cassockJwtToken')||'a'
  try{
  const response:any = await getData(getWalletsUrl, authorizationData);
  
  if (response.status ===200 && Array.isArray(response.data)){
    console.log(response.data)
    return response.data
  }
  return []
  }catch(error:any){
    console.error(error)
  }
}

export const patchWallet=async ( data:WalletType) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';

    const response = await patchItem(patchWalletUrl, data, authorizationData);
    if (response.status === 200) {
      alert('wallet updated succesfully')
      window.location.reload();   
  }
}catch (error:any) {
 console.error(error)
 alert('unable to update the wallet at this time')
}
}

export const deleteWallet= async (id:number) => {
const url =`${deleteWalletRoute}/${id}`
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
    const response = await deleteItem(url,authorizationData);
    if (response.status === 200) {
      alert('manager deleted succesfully')
      window.location.reload();
  }
  return response.status
}catch (error:any) {
 console.error(error)
  alert('unable to delete manager at this time')
}

}

export const createPromo= async (data:CreatePromoType) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
    const response = await postData(createPromoUrl, data, authorizationData);
    if (response.status === 201) {
    alert('promo added succesfully')
    window.location.reload();
    } 
}catch (error:any) {
    alert('unable to create a promo at this time')
    console.error(error)
 }
};

export const getPromo=async ()=>{
  const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
  try{
  const response:any = await getData(getPromoUrl, authorizationData);
  if (response.status ===200){
  return response.data
  }
  return []
  }catch(error:any){
    console.error(error)
 
  }
}

export const patchPromo=async ( data:any) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
    const response = await patchItem(patchPromoUrl, data, authorizationData);
    if (response.status === 200) {
      alert('promo updated succesfully')
      window.location.reload();
    }
}catch (error:any) {
 console.error(error)
 alert('unable to update the promo at this time try again later')
}
}

export const deletePromo= async (id:number) => {
  const url =`${deletePromoRoute}/${id}`
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
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
      alert('investors investment successfully added deleted succesfully')
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






