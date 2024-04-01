import { DecodedToken } from "./types";
import { jwtDecode } from "jwt-decode";


export const verifyToken = (token: string): DecodedToken | null => {
    try {
      const decoded: any = jwtDecode(token);
      const { id,  role, name,hasInvested } = decoded;
      return { id, role, hasInvested,name, };
    } catch (error: any) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  export const isAuthorised =  (
    role: string,
    setUserName: (name: string) => void
  ): boolean => {
    const token: string | null = localStorage.getItem('cassockAuthToken');
  
    if (!token) {
      return false;
    }
  
    try {
      const verifiedToken = verifyToken(token);
      if (verifiedToken) {
        if (verifiedToken.role !== role) {
          return false;
        } else {
          if (verifiedToken.name) {
            setUserName(verifiedToken.name);
          }
          return true;
        }
      } else {
        console.error('Token verification failed.');
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };

  export const doPasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };