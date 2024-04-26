import axios, { AxiosResponse } from 'axios';

export const postData = async (url: string, data: any, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (authorizationData) {
    headers['Authorization'] = authorizationData;
  }

  try {
    const response: AxiosResponse<any> = await axios.post(url, data, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postFormData = async (url: string, formData: FormData, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {};

  if (authorizationData) {
    headers['Authorization'] = authorizationData;
  }

  try {
    const response: AxiosResponse<any> = await axios.post(url, formData, { headers });
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
    const response: AxiosResponse<any> = await axios.get(url, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteItem = async (url: string, authorizationData: string|null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (!authorizationData) {
    throw new Error('Authorization data is null, not allowed to make this request');
  }

  headers['Authorization'] = authorizationData;

  try {
    const response: AxiosResponse<any> = await axios.delete(url, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};


export const patchItem = async (url: string, data: any, authorizationData: string|null) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (!authorizationData) {
    throw new Error('Authorization data is null, not allowed to make this request');
  }

  headers['Authorization'] = authorizationData;

  try {
    const response: AxiosResponse<any> = await axios.patch(url, data, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const patchFormDataItem = async (url: string, formData: FormData, authorizationData: string | null = null) => {
  const headers: { [key: string]: string } = {};
  console.log(url)
  if (authorizationData) {
    headers['Authorization'] = authorizationData;
  }
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  })
  try {
    const response: AxiosResponse<any> = await axios.patch(url, formData, { headers });
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};