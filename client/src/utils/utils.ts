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

export const findManagerWithHighestMinInvestment = (managers: ManagerType[], amount: number) => {
  let highestMinInvestmentManager: ManagerType | null = null;
  let highestMinInvestment = 0;

  managers.forEach((manager) => {
    if (manager.minimumInvestmentAmount <= amount && manager.minimumInvestmentAmount > highestMinInvestment) {
      highestMinInvestment = manager.minimumInvestmentAmount;
      highestMinInvestmentManager = manager;
    }
  });
  if (highestMinInvestmentManager) {
    return highestMinInvestmentManager;
  }
  return null;
};

export const formatStartDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

export const formatEndDate = (dateString: string, numberOfDays: number): string => {
  const startDate = new Date(dateString);
  const endDate = new Date(startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
  return endDate.toLocaleDateString('en-GB');
};

export const createMultiplicationObject = (commenceDate: string, number: number): Record<string, number> => {
  const startDate = new Date(commenceDate);
  const currentDate = new Date();

  const daysDifference = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Number of days between commence date and current date

  const resultObject: Record<string, number> = {};

  for (let i = 1; i <= daysDifference; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i - 1); // Set the date to the current day in the loop
    const key = currentDate.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format
    const value = number * i; // Calculate the value as multiplication of the number by the day index
    resultObject[key] = value;
  }

  return resultObject;
};
