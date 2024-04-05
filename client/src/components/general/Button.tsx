import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEnvelope, faFile,} from '@fortawesome/free-solid-svg-icons';
import'../styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { createInvestment,deleteManager, patchManager,createManager,patchInvestment,createWallet, patchWallet } from '../../utils/api';
import { EditManagerType, EditWalletType, InvestmentType, WalletType } from '../../utils/types';




export const GetStartedButton:React.FC =()=>{
  const navigate = useNavigate()
    return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
}
export const ViewCerficateButton:React.FC =()=>{

  return<button  className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>

}

export const ContactButton:React.FC =()=>{
  return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
}

export const ResendVerificationTokenButton:React.FC<{function:any}> =(props)=>{
  return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>

}

export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
  </div>
}

export const MoveToPatchManager:React.FC<{data:EditManagerType}> =({data})=>{
  localStorage.setItem('cassockManager',JSON.stringify(data))

  const navigate = useNavigate()
  return <button onClick={()=>navigate('/patch-manager')} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
}

export const MoveToPatchWallet:React.FC<{data:EditWalletType}> =({data})=>{
  localStorage.setItem('cassockWallet',JSON.stringify(data))

  const navigate = useNavigate()
  return <button onClick={()=>navigate('/patch-wallet')} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
}

// export const DeleteManagerButton:React.FC<{managerId:number}> =({managerId})=>{
//   const navigate = useNavigate()
//   return <button onClick={()=>deleteManager(managerId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }


export const CreateInvestmentButton:React.FC<{investorId:number,managerId:number}> =({managerId,investorId})=>{
  const navigate = useNavigate()
  return <button onClick={()=>createInvestment(managerId,investorId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
}

export const EditInvestmentButton:React.FC<{investorId:number,data:InvestmentType}> =({investorId,data})=>{
  const navigate = useNavigate()
  return <button onClick={()=>patchInvestment(investorId,data,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
}


// export const DeleteManagerButton:React.FC<{managerId:number}> =({managerId})=>{
//   const navigate = useNavigate()
//   return <button onClick={()=>deleteManager(managerId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }