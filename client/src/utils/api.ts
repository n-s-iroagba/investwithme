import axios, { AxiosResponse } from 'axios';



export const postData = async (url: string, data: any, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (authorizationData) {
    headers['Authorization'] = authorizationData;
  }

  try {
    const response: AxiosResponse<{ data: string }> = await axios.post(url, data, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getData = async (url: string, authorizationData: string | null=null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (authorizationData === null) {
    throw new Error('Authorization data is null, not allowed to make this request');
  }

  headers['Authorization'] = authorizationData;

  try {
    const response: AxiosResponse<{ data: string }> = await axios.get(url, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteItem = async (url: string, itemId: number, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (authorizationData === null) {
    throw new Error('Authorization data is null, not allowed to make this request');
  }

  headers['Authorization'] = authorizationData;

  try {
    const response: AxiosResponse<{ message: string }> = await axios.delete(`${url}/${itemId}`, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};


export const patchItem = async (url: string, itemId: number, data: any, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (authorizationData === null) {
    throw new Error('Authorization data is null, not allowed to make this request');
  }

  headers['Authorization'] = authorizationData;

  try {
    const response: AxiosResponse<{ message: string }> = await axios.patch(`${url}/${itemId}`, data, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const createInvestment = async (managerId: number, investorId: number, navigate: (path: string) => void) => {
  const url = 'your-api-url-for-create-investment';
  const data = {
    managerId,
    investorId,
  };
  const authorizationData = localStorage.getItem('cassockAuthToken');

  try {
    const response = await postData(url, data, authorizationData);
    if (response.status === 201) {
      navigate('/success-page'); // Navigate to success page or any other route
    } else {
      throw new Error('Failed to create investment'); // Handle other status codes or error cases
    }
  } catch (error) {
    console.error('Error creating investment:', error);
    throw new Error('Failed to create investment'); // Throw a more descriptive error if needed
  }
};
