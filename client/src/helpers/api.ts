import axios, { AxiosResponse } from 'axios';
import {jwtDecode} from 'jwt-decode';

export type SuccessCallback<T> = (data: T, navigate: (path: string) => void ,navUrl:string) => void;

export async function postData<T>(
    url: string,
    data: any,
    navigate: (path: string) => void,
    navUrl: string,
    successCallback: SuccessCallback<T> | null = null,
    authorizationData: string | null = null
  ): Promise<any> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };
    if (authorizationData) {
      headers['Authorization'] = authorizationData;
    }
    try {
      const response: AxiosResponse<T> = await axios.post(url, data, { headers });
      if (response.status === 200) {
        if (successCallback) {
          successCallback(response.data,navigate, navUrl);
        }
         return response.status;
      } else {
        return response.status;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    
    }
  }
  
  

  interface DecodedToken {
    id: string;
    email: string;
    role: string;
  }
  
  // Define your verifyToken function
  const verifyToken = (token: string): DecodedToken | null => {
    try {
      const decoded: any = jwtDecode(token);
      const { id, email, role } = decoded;
      return { id, email, role };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
  // Modify your checkAuthorised function
  export const checkAuthorised = (
    role: string,
    navigate: (path: string) => void,
    setUserEmail: (email: string) => void,
    setUserRole: (role: string) => void
  ): boolean  => {
    const token: string | null = localStorage.getItem('cAssocKJwtToken');
  
    if (!token) {
      displayAlertAndRedirect(role, navigate);
      return false;
    }
  
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      if (verifiedToken.role !== role) {
        displayAlertAndRedirect(role, navigate);
        return false;
      } else {
        setUserEmail(verifiedToken.email);
        setUserRole(verifiedToken.role);
      }
      return true;
    } else {
      // Handle case when verifiedToken is null
      console.error('Token verification failed.');
      return false;
    }
  };

  const displayAlertAndRedirect = (role: string, navigate: (path: string) => void): void => {
    let redirectPath: string;
    if (role === 'admin') {
      redirectPath = '/admin-login/xxx';
    } else {
      redirectPath = '/login';
    }
    alert('You are forbidden from accessing this portal, kindly login');
    navigate(redirectPath);
  };
 export  const deleteItem = async (domain:string,itemId:number) => {
    try {
      const response:any = await axios.delete(`${domain}/${itemId}`);
      alert('Item deleted successfully:'+ response.data);
      return response.data;
    } catch (error:any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server Error:', error.response.data);
        return { error: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        return { error: 'No response received from server' };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request Error:', error.message);
        return { error: error.message };
      }
    }
  };