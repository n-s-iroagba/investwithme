
import { jwtDecode } from "jwt-decode";


import { DecodedLoginToken, DecodedVerificationToken} from '../../../../../common/authTypes'
import { DecodedChangePasswordToken } from "../types/authTypes";

export const getLoginDecodedToken = (): DecodedLoginToken | null => {
  const token = localStorage.getItem('cassockJwtToken');
  
  if (!token) {
      return null;
  }

  try {
      const decodedToken = jwtDecode<DecodedLoginToken>(token);
      return decodedToken;
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
};


  export const getVerificationTokenData = (token:string):DecodedVerificationToken|null=>{
    const decoded:DecodedVerificationToken|null= jwtDecode(token)
    return decoded;
  }
    
  export const decodeChangePasswordToken = (token:string) => {
  
    const decoded : DecodedChangePasswordToken |null= jwtDecode(token)
  return decoded
  };

export const logOut = (navigate:(path:string)=>void)=>{
    localStorage.removeItem('cassockJwtToken')
    localStorage.removeItem('cassockId')
    localStorage.removeItem('cassockInvestment');

   navigate('/')
  }