import { deleteItem, patchItem, postData } from "./api";
import { EditManagerType, EditWalletType, InvestmentType, ManagerType, WalletType } from "./types";
import { createInvestmentUrl, patchInvestmentUrl,createManagerUrl, patchManagerUrl, deleteManagerRoute, createWalletUrl, patchWalletUrl, deleteWalletRoute} from "./constants";

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

export const createInvestment = async (managerId: number, investorId: number, navigate: (path: string) => void) => {
  const data = {
    managerId: managerId,
    investorId: investorId
  }

  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createInvestmentUrl, data, authorizationData);
    if (response.status === 200) {
      localStorage.setItem('cassockManagers', JSON.stringify(response.data.managers))
      localStorage.setItem('cassockManagers', JSON.stringify(response.data.investement))
      navigate('/invest'); 
    } else {
      alert('unable to create a new investment at this time')
  } 
}catch (error) {
    console.error('Error creating investment:', error);
  }
};

export const patchInvestment =async (data:InvestmentType, navigate: (path: string) => void) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchInvestmentUrl, data, authorizationData);
    if (response.status === 200) {
      localStorage.setItem('cassockDepositWallet', JSON.stringify(response.data.wallet))
      navigate('/invest-payment'); 
    } else {
      alert('unable to create a new investment at this time')
  } 
}catch (error) {
 console.error(error)
}
}


export const createManager= async (data:ManagerType, navigate: (path: string) => void) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createManagerUrl, data, authorizationData);
    if (response.status === 201) {
    alert('manager added succesfully')
    window.location.reload();
    } else {
      alert('unable to create a manager at this time')
  } 
}catch (error) {
    console.error('Error creating investment:', error);
  }
};

export const patchManager=async ( data:EditManagerType,navigate: (path: string) => void) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchManagerUrl, data, authorizationData);
    if (response.status === 200) {
      alert('manager updated succesfully')
     navigate('/admin/manager')
    } else {
      alert('unable to update the manager at this time')
  } 
}catch (error) {
 console.error(error)
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
}catch (error) {
 console.error(error)
}

}

export const createWallet= async (data:WalletType,navigate: (path: string) => void) => {
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await postData(createWalletUrl, data, authorizationData);
    if (response.status === 201) {
    alert('wallet added succesfully')
    window.location.reload();
    } else {
      alert('unable to create a wallet at this time')
  } 
}catch (error) {
    console.error('Error creating investment:', error);
  }
};

export const patchWallet=async ( data:EditWalletType, navigate: (path: string) => void) =>{
  try {
    const authorizationData = localStorage.getItem('cassockJwtToken');
    const response = await patchItem(patchWalletUrl, data, authorizationData);
    if (response.status === 200) {
      alert('wallet updated succesfully')
      navigate('/admin/wallet')
      
    } else {
      alert('unable to update the wallet at this time')
  } 
}catch (error) {
 console.error(error)
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
}catch (error) {
 console.error(error)
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
