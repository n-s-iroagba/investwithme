
import { jwtDecode } from "jwt-decode";
import { AdminDecodedLoginToken, DecodedLoginToken } from './types';


const decodeLoginToken:()=>AdminDecodedLoginToken|DecodedLoginToken|null = ()=>{
  const token = localStorage.getItem('cassockJwtToken')
  if (token)
  return jwtDecode(token) as AdminDecodedLoginToken|DecodedLoginToken
  else
    return null
}
export const getAdminAuthData = () => {
  const decodedToken: AdminDecodedLoginToken | DecodedLoginToken | null = decodeLoginToken();
  if (decodedToken && decodedToken.role === 'admin') {
    return decodedToken;
  }
  return null;
};

  export const getInvestorAuthData = ()=>{
    const decodedToken: AdminDecodedLoginToken | DecodedLoginToken | null = decodeLoginToken();
  if (decodedToken && decodedToken.role === 'investor') {
    return decodedToken;
  }
  return null;
  }
  
  export const doPasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  
  
  export const decodePasswordChangeToken = (token:string) => {
  
    const decoded :{id:string,role:string,email:string} |null= jwtDecode(token) as {id:string,role:string,email:string}
  return decoded
  };

  export const getVerificationTokenData = (token:string)=>{
    const decoded:any= jwtDecode(token)
    return decoded;
  }