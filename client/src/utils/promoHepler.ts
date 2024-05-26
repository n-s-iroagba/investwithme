import { postData, getData, patchItem, deleteItem } from "./api";
import { createPromoUrl, getPromoUrl, patchPromoUrl, deletePromoRoute } from "./constants";
import { CreatePromoType } from "./types";

export const createPromo= async (data:CreatePromoType) => {
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
      const response = await postData(createPromoUrl, data, authorizationData);
      if (response.status === 201) {
      alert('promo added succesfully')
      window.location.reload();
      } 
  }catch (error:any) {
      alert('unable to create a promo at this time')
      console.error(error)
   }
  };
  
  export const getPromo=async ()=>{
    const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
    try{
    const response:any = await getData(getPromoUrl, authorizationData);
    if (response.status ===200){
    return response.data
    }
    return []
    }catch(error:any){
      console.error(error)
   
    }
  }
  
  export const patchPromo=async ( data:any) =>{
    try {
      const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
      const response = await patchItem(patchPromoUrl, data, authorizationData);
      if (response.status === 200) {
        alert('promo updated succesfully')
        window.location.reload();
      }
  }catch (error:any) {
   console.error(error)
   alert('unable to update the promo at this time try again later')
  }
  }
  
  export const deletePromo= async (id:number) => {
    const url =`${deletePromoRoute}/${id}`
      try {
        const authorizationData = localStorage.getItem('cassockJwtToken')||'a';
        const response = await deleteItem(url,authorizationData);
        if (response.status === 200) {
          alert('promo deleted succesfully')
          window.location.reload();
        }
      return response.status
    }catch (error:any) {
     console.error(error)
     alert('unable to delete promo at this time')
    }
    }