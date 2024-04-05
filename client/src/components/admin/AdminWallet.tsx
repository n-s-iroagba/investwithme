import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles.css'
import { WalletType } from '../../utils/types';


const WalletCard:React.FC<{wallet:WalletType, deleteButton:React.ReactNode, editButton:React.ReactNode,}> = ({wallet,deleteButton,editButton})=>{
 
  return(
    <div className='px-1'>
    <Card className={`shade  round-card my-1 w-100`}>
      <Card.Body>
      <Card.Text >{wallet.blockchain}</Card.Text>
      <Card.Title>{wallet.network}</Card.Title>
      <Card.Text>{wallet.currency}</Card.Text>
      <Card.Text>{wallet.address}</Card.Text>
      {editButton}
      {deleteButton}
      </Card.Body>

    </Card>
    </div>
  )
}



const AdminWallet = ()=>{

    const wallets = [{
        blockchain: 'Ethereum',
        address: '0x123abc...',
        network: 'Mainnet',
        currency: 'ETH'
      }, {
        blockchain: 'Bitcoin',
        address: '1AbCDe...',
        network: 'Testnet',
        currency: 'BTC'
      }, {
        blockchain: 'Binance Smart Chain',
        address: '0x456def...',
        network: 'Mainnet',
        currency: 'BNB'
      }]

 return(
    <>
    {wallets.map((wallet)=>(
        <WalletCard wallet={wallet} deleteButton={<button className='button-styles button-width-narrow'>Delete</button>} editButton={<button className='button-styles button-width-narrow'>Edit</button>} />
    ))}
    </>
 )
}
export default AdminWallet