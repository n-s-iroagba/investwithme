import { deleteItem, patchItem, postData } from "./api";
import { CreateInvestmentType, ManagerType, WalletType } from "./types";
import { createManagerUrl, patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, deleteWalletRoute, createInvestmentRoute} from "./constants";

export const createInvestment = async (data: CreateInvestmentType, investorId: number) => {
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

export const patchManager=async ( data:ManagerType) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchManagerUrl, data, authorizationData);
    if (response.status === 200) {
      alert('manager updated succesfully')
      window.location.reload();
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

export const createWallet= async (data:WalletType) => {
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
  return []
}

