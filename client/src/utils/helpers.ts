import { deleteItem, patchItem, postData } from "./api";
import { CreateInvestmentType, ManagerType, WalletType } from "./types";
import { createManagerUrl, patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, deleteWalletRoute, createInvestmentRoute} from "./constants";

export const isLargeScreen = () => {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  return mediaQuery.matches;
}

export const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const canInvest = (investmentAmount:number, managers:any) =>{
  if (!managers || managers.length === 0) {
    return false;
  }
  const minMinInvestment = Math.min(...managers.map((manager:any) => manager.minimumInvestmentAmount));
  return investmentAmount < minMinInvestment;
}

export const findManagerWithHighestMinInvestment = (managers: ManagerType[], amount: number): ManagerType | null => {
  let highestMinInvestmentManager: ManagerType | null = null;
  let highestMinInvestment = 0;

  managers.forEach((manager) => {
    if (manager.minimumInvestmentAmount <= amount && manager.minimumInvestmentAmount > highestMinInvestment) {
      highestMinInvestment = manager.minimumInvestmentAmount;
      highestMinInvestmentManager = manager;
    }
  });

  return highestMinInvestmentManager;
};

export const getGreeting = (): string => {
  const currentTime = new Date().getHours();

  if (currentTime >= 0 && currentTime < 12) {
    return 'Good morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
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

export const hasEmptyKey = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    if (obj[key] === '') {
      return true;
    }
  }
  return false;
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
}catch (error:any) {
 console.error(error)
 throw new Error(error.message)
}

}
export const getPromoRemainingTime = (date: string, duration: number) => {
  const now = new Date();
  const promoDate = new Date(date).getTime() + duration;
  
  if (isNaN(promoDate)) {
    throw new Error('Invalid date format. Please provide a valid date string.');
  }
  
  const timeDifference = promoDate - now.getTime(); 
  return timeDifference;
}
export const findManagerById = (managersArray:ManagerType[], idToFind:number) => {
  return managersArray.find((manager) => manager.id === idToFind);
};
