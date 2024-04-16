import { deleteItem, patchItem, postData } from "./api";
import { CreateInvestmentType, CreateWalletType, ManagerType, WalletType } from "./types";
import { createManagerUrl, patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, deleteWalletRoute, createInvestmentRoute} from "./constants";

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

export const createManager= async (data:ManagerType) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createManagerUrl, data, authorizationData);
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

export const patchManager=async ( data:ManagerType,navigate:(path:string)=>void) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchManagerUrl, data, authorizationData);
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
 throw new Error(error.message)
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
export const getNewbies = ()=>{
  return [//returns array

  ]
}
export const logOut = (navigate:(path:string)=>void)=>{
 navigate('/')
}
export const getManagers = ()=>{
  return [
   {
      id: 1,
        firstName: 'string',
        lastName: 'string',
        minimumInvestmentAmount: 0,
        percentageYield: 159,
        duration:2,
        image: '',
        qualification: 'string'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        minimumInvestmentAmount: 500,
        percentageYield: 7,
        duration: 18,
        image: 'path/to/image2.jpg',
        qualification: 'Chartered Accountant',
      }
  ]
}
export const getAdminWallets = ()=>{
  return [   {
    id: 1,
    blockchain: 'Ethereum',
    address: '0x1234567890abcdef',
    network: 'Mainnet',
    currency: 'ETH',
  },
   {
    id: 2,
    blockchain: 'Bitcoin',
    address: 'bc1q2w3e4r5t6y7u8i9o0p',
    network: 'Testnet',
    currency: 'BTC',
  },

 {
    id: 3,
    blockchain: 'Binance Smart Chain',
    address: '0xa1b2c3d4e5f6g7h8i9j0k',
    network: 'Testnet',
    currency: 'BNB',
  }
      ]

 //returns array


}

export const getInvestmentNewbies =() =>{
  return ['referral']
}

export const getCurrencies =() =>{
return['EUR']
}

export const getPromo=()=>{
  return  {
    id: 1,
    startDate: new Date('2021-01-01').toDateString(),
    durationInDays: 30,
  };
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
  return 5;
}
export const getAccountBalance =()=>{
  return 5000
}

export const getPorfolioData=()=>{
  return null
}