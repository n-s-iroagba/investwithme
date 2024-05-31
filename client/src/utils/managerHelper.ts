import { ManagerData } from "../../../common/types";
import { deleteItem, getData, patchFormDataItem, postFormData } from "./api";
import { createManagerUrl, getManagersUrl, getSingleMangerRoute, patchManagerUrl, deleteManagerRoute } from "./constants";

export const createManager= async (data:FormData) => {
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      const response = await postFormData(createManagerUrl, data, authorizationData);
      if (response.status === 201) {
      alert('manager added succesfully')
      window.location.reload();
    } 
  }catch (error:any) {
    console.error(error)
    alert('unable to create a manager at this time')
   }
  
  };
  
  export const getManagers = async (): Promise<ManagerData[]> => {
    try {
  
      const authorizationData = localStorage.getItem('cassockJwtToken');
  
      const response = await getData(getManagersUrl,authorizationData);
   
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data as ManagerData [];
      }
  
      return [];
      
    } catch (error: any) {
      console.error(error);
      return error
    
    }
  };
  
  
  
  export const getSingleManager = async (id:string)=>{
    const getSingleMangerUrl = `${getSingleMangerRoute}/${id}`
    const authorizationData = localStorage.getItem('cassockJwtToken');
    try{
    const response = await getData(getSingleMangerUrl,authorizationData);
    if (response.status ===200){
    return response.data
    }
    }catch(error:any){
      console.error(error)
    }
  }
  
  export const patchManager=async ( data:FormData,navigate:(path:string)=>void,id:number) =>{
    console.log('id is' +id)
    const url = `${patchManagerUrl}/${id}`
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      const response = await patchFormDataItem(url, data, authorizationData);
      if (response.status === 200) {
        alert('manager updated succesfully')
       navigate('/admin/managers')
      } 
  }catch (error:any) {
    console.error(error)
    alert('unable to update the manager at this time')
  }
  }
  
  export const deleteManager = async (id:number) => {
  const url =`${deleteManagerRoute}/${id}`
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken');
      const response = await deleteItem(url,authorizationData);
      if (response.status === 200) {
        alert('manager deleted succesfully')
        window.location.reload();
    } 
  }catch (error:any) {
    console.error(error)
    alert('unable to delete manager at this time')
   }
  }