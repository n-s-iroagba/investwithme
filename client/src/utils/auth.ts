
import { AdminAuthorizationData,DecodedToken } from "./types";
import { jwtDecode } from "jwt-decode";



  export const getAuthData = (token:string): AdminAuthorizationData | DecodedToken| null => {


    let decodedToken:  DecodedToken | null = null

      decodedToken = jwtDecode(token);
      if (decodedToken) {
        if (decodedToken.role === 'admin') {
          return {
            authorised: true,
            name: decodedToken.username,
            role: decodedToken.role,
            verificationStatus: decodedToken.verificationStatus,
            email: decodedToken.email
          };
        } else {
          return decodedToken;
        }
      } else {
        return null;
      }
      
  };

  export const doPasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  
  
  export const decodePasswordChangeToken = () => {
    const token: string | null = localStorage.getItem('cassockPasswordChangeToken');
    if (!token)
    return null
    const decoded :{id:string,role:string} |null=jwtDecode(token)
  return decoded
   
  };