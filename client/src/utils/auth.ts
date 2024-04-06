
import { AdminAuthorizationData, AdminDecodedToken, AuthorizationData, DecodedToken } from "./types";
import { jwtDecode } from "jwt-decode";



  export const getAuthData = (role: string): AdminAuthorizationData | AuthorizationData| null => {
    // Mock decoded token for demonstration
    const token = localStorage.getItem('cassockJwtToken') as string;
    let decodedToken: AdminDecodedToken | DecodedToken | null = null

      decodedToken = jwtDecode(token);
  
    if (decodedToken && decodedToken.role === role) {
      return { authorised: true, name: decodedToken.name };
    } else {
      return { authorised: false, name: '' }; // or handle unauthorized case as needed
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