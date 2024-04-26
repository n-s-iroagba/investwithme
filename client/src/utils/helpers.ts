import { deleteItem, getData, patchFormDataItem, patchItem, postData,postFormData } from "./api";
import { AddInvestmentType, CreateInvestmentType, CreatePromoType, CreateWalletType, PromoType, WalletType } from "./types";
import { createManagerUrl, patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, deleteWalletRoute, createInvestmentRoute, getManagersUrl, getWalletsUrl, getPromoUrl, createPromoUrl, patchPromoUrl, deletePromoRoute, payUrl, deleteInvestorRoute, payReferralRoute, payBonusRoute, getSingleMangerRoute} from "./constants";

export const createInvestment = async (data: CreateInvestmentType) => {
  const investorId =1
  const createInvestmentUrl = `${createInvestmentRoute}/${investorId}`;

  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    return await postData(createInvestmentUrl, data, authorizationData);
  }catch (error:any) {
    console.error(error)
    throw new Error(error.message)
   }
  
};

export const createManager= async (data:FormData) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postFormData(createManagerUrl, data, authorizationData);
    if (response.status === 201) {
    alert('manager added succesfully')
    window.location.reload();
    } else {
      alert('unable to create a manager at this time')
  } 
}catch (error:any) {
  console.error(error)
  throw new Error(error.message)
 }

};

export const getManagers = async ()=>{
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response = await getData(getManagersUrl,authorizationData);
  if (response.status ===200)
  return response.data
  throw new Error('no managers found')
  
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}
export const getSingleManager = async (id:string)=>{
  const authorizationData = localStorage.getItem('cassockJwtToken');
  const url = `${getSingleMangerRoute}/${id}`
  try{
  const response = await getData(url,authorizationData);
  if (response.status ===200)
  return response.data
  throw new Error('no managers found')
  
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}

export const patchManager=async ( data:FormData,navigate:(path:string)=>void) =>{
  console.log(data)
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchFormDataItem(patchManagerUrl, data, authorizationData);
    if (response.status === 200) {
      alert('manager updated succesfully')
     navigate('/admin/managers')
    } else {
      alert('unable to update the manager at this time')
  } 
}catch (error:any) {
  console.error(error)
  throw new Error(error.message)
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
    } else {
      alert('unable to delete manager at this time')
  } 
}catch (error:any) {
  console.error(error)
  throw new Error(error.message)
 }


}

export const createWallet= async (data:CreateWalletType) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createWalletUrl, data, authorizationData);
    if (response.status === 201) {
    alert('wallet added succesfully')
    window.location.reload();
    } else {
      alert('unable to create a wallet at this time')
  } 
}catch (error:any) {
  console.error(error)
  throw new Error(error.message)
 }
};

export const getAdminWallets = async ()=>{
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = await getData(getWalletsUrl, authorizationData);
  if (response.status ===200){
    console.log(response.data)
    return response.data
  }else{
    return []
  }
  
  
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}

export const patchWallet=async ( data:WalletType) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchWalletUrl, data, authorizationData);
    if (response.status === 200) {
      alert('wallet updated succesfully')
      window.location.reload();
      
    } else {
      alert('unable to update the wallet at this time')
  }
}catch (error:any) {
 console.error(error)
 console.log(error)
 return error
}
}

export const deleteWallet= async (id:number) => {
const url =`${deleteWalletRoute}/${id}`
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await deleteItem(url,authorizationData);
    if (response.status === 200) {
      alert('manager deleted succesfully')
      window.location.reload();
    } else {
      alert('unable to delete manager at this time')
  }
  return response.status
}catch (error:any) {
 console.error(error)
 throw new Error(error.message)
}

}

export const getPromo=async ()=>{
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = await getData(getPromoUrl, authorizationData);
  if (response.status ===200){
  return response.data
  }else{
    return null
  }
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}

export const createPromo= async (data:CreatePromoType) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createPromoUrl, data, authorizationData);
    if (response.status === 201) {
    alert('promo added succesfully')
    window.location.reload();
    } else {
      alert('unable to create a promo at this time')
  } 
}catch (error:any) {
  console.error(error)
  throw new Error(error.message)
 }
};
export const logOut = (navigate:(path:string)=>void)=>{
  localStorage.removeItem('cassockJwtToken')
 navigate('/')
}
export const getNewbies = ()=>{
  return [//returns array

  ]
}

export const patchPromo=async ( data:any) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchPromoUrl, data, authorizationData);
    if (response.status === 200) {
      alert('promo updated succesfully')
      window.location.reload();
      
    } else {
      alert('unable to update the promo at this time')
  }
}catch (error:any) {
 console.error(error)
 throw new Error(error.message)
}
}

export const deletePromo= async (id:number) => {
  const url =`${deletePromoRoute}/${id}`
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      const response = await deleteItem(url,authorizationData);
      if (response.status === 200) {
        alert('promo deleted succesfully')
        window.location.reload();
      } else {
        alert('unable to delete promo at this time')
    }
    return response.status
  }catch (error:any) {
   console.error(error)
   throw new Error(error.message)
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
    } else {
      alert('unable to delete promo at this time')
  }
  return response.status
}catch (error:any) {
 console.error(error)
 throw new Error(error.message)
}
}

export const addInvestment =async (data:AddInvestmentType) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(payUrl,authorizationData);
    if (response.status === 200) {
      alert('investors investment successfully added deleted succesfully')
      window.location.reload();
    } else {
      alert('unable to add investment amount at this time')
  }
  return response.status
}catch (error:any) {
 console.error(error)
 throw new Error(error.message)
}

}
export const payReferral = (id:number)=>{
  const url = `${payReferralRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = getData(url, authorizationData);
  if (response.status ===200)
  return response.data
  throw new Error('no promo found')
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}
export const payPromoBonus = (id:number)=>{
  const url = `${payBonusRoute}/${id}`
  const authorizationData = localStorage.getItem('cassockJwtToken');
  try{
  const response:any = getData(url, authorizationData);
  if (response.status ===200)
  return response.data
  throw new Error('no promo found')
  }catch(error:any){
    console.error(error)
  throw new Error(error.message)
  }
}

export const getInvestmentNewbies:()=>string[]=() =>{
  return ['referral']
}

export const getCurrencies =() =>{
return['EUR']
}


export const getUnpaidReferrals =()=>{
  return [
    //referallType
  
  ]
}
export const getBonus = () =>{
  return[
    //BOnusType
  ]
}
export const getInvestors = ()=>{
      //AdminInvestorType
  return[ 
  ]
}
export const getNumberOfNewNotifications=()=>{
  return 1;
}
export const getAccountBalance =()=>{
  return 5000
}

export const getPorfolioData=()=>{
  return null
}
export const getCryptoData = ()=>{
  return{
    networks:['erc','btc'],
    blockchains:['erc','btc'],
    currencies:['erc','btc']
  }
}
