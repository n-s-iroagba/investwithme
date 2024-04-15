import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEnvelope, faFile,} from '@fortawesome/free-solid-svg-icons';
import'../styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ManagerType,} from '../../utils/types';





export const GetStartedButton:React.FC =()=>{
  const navigate = useNavigate()
    return<button onClick={()=>navigate('/invest/managers')} className='button-styles'><div>Get Started</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
}
export const ViewCerficateButton:React.FC =()=>{

  return<button  className='button-styles'><div>View Certificate of Incoporation</div><div ><FontAwesomeIcon icon={faFile} beatFade/></div></button>

}


export const ContactButton:React.FC =()=>{
  return<button className='button-styles'><div>Get In Touch</div><div ><FontAwesomeIcon icon={faEnvelope} beatFade/></div></button>
}

export const ResendVerificationTokenButton:React.FC<{function:any}> =(props)=>{
  return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>

}

export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
  </div>
}


export const SelectManagerButton: React.FC<{managerId?:number}> = ({ managerId }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    localStorage.setItem('cassockNewInvestmentInitmanagerId', JSON.stringify(managerId));
    navigate('/invest'); 
  };

  return (
    <button onClick={handleInvestClick} className='button-styles'>
      Invest with this Manager
    </button>
  );
};


export const MoveToPatchManager: React.FC<{ manager: ManagerType }> = ({ manager }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    localStorage.setItem('cassockManager', JSON.stringify(manager));
    navigate('/patch-manager');
  };

  return (
    <button onClick={handleInvestClick} className='button-styles'>
      <div>Invest with this manager</div>
      <div><FontAwesomeIcon icon={faDollarSign} beatFade /></div>
    </button>
  );
};

// export const MoveToPatchWallet:React.FC<{managerId:WalletType}> =({managerId})=>{
//   localStorage.setItem('cassockWallet',JSON.stringify(managerId))

//   const navigate = useNavigate()
//   return <button onClick={()=>navigate('/patch-wallet')} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }

// export const DeleteManagerButton:React.FC<{managerId:number}> =({managerId})=>{
//   const navigate = useNavigate()
//   return <button onClick={()=>deleteManager(managerId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }



// export const EditInvestmentButton:React.FC<{investorId:number,managerId:InvestmentType}> =({investorId,managerId})=>{
//   const navigate = useNavigate()
//   return <button onClick={()=>patchInvestment(investorId,managerId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }


// export const DeleteManagerButton:React.FC<{managerId:number}> =({managerId})=>{
//   const navigate = useNavigate()
//   return <button onClick={()=>deleteManager(managerId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
// }