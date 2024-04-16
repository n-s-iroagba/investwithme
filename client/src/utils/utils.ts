import { ManagerType } from "./types";


export const numberWithCommas = (number:number) => {
  const str = String(number);
  let formatted = '';
  for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
    formatted = str[i] + formatted;
    if (count % 3 === 2 && i !== 0) {
      formatted = ',' + formatted;
    }
  }
  return formatted;
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

export const hasEmptyKey = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    if (obj[key] === '') {
      return true;
    }
  }
  return false;
};

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