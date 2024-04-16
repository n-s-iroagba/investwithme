import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../styles.css'
import { EditWalletType } from '../../utils/types';
import EditWalletModal from './EditWalletModal';
import DeleteModal from './DeleteModal';


const WalletCard:React.FC<{wallet:EditWalletType, deleteButton:React.ReactNode, editButton:React.ReactNode,}> = ({wallet,deleteButton,editButton})=>{
 
  return(
    <div className='px-1'>
    <Card className={`shade  round-card my-1 w-100`}>
      <Card.Body>
      <Card.Text >{wallet.blockchain}</Card.Text>
      <Card.Title>{wallet.network}</Card.Title>
      <Card.Text>{wallet.currency}</Card.Text>
      <Card.Text>{wallet.address}</Card.Text>
      {editButton}
      <br/>
      {deleteButton}
      </Card.Body>

    </Card>
    </div>
  )
}



const AdminWallet = ()=>{
  const [showModal,setShowModal] = useState(false)
  const [wallets,setWallets] = useState<EditWalletType[]>([])
  const [data, setData] = useState<EditWalletType>({
    id:1,
      blockchain: 'Ethereum',
      address: '0x123abc...',
      network: 'Mainnet',
      currency: 'ETH'
    })
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
  const [showDeleteModal,setShowDeleteModal]= useState(false)

 useEffect(()=>{



    const receivedWallets = [{
      id:1,
        blockchain: 'Ethereum',
        address: '0x123abc...',
        network: 'Mainnet',
        currency: 'ETH'
      }, {
        id:2,
        blockchain: 'Bitcoin',
        address: '1AbCDe...',
        network: 'Testnet',
        currency: 'BTC'
      }, {
        id:3,
        blockchain: 'Binance Smart Chain',
        address: '0x456def...',
        network: 'Mainnet',
        currency: 'BNB'
      }]

      setWallets(receivedWallets)

    }, [])
  const handleEdit =(index:number) =>{
    setShowModal(true)
    setData(wallets[index])
  }
  const handleDelete =(index:number) =>{
    setShowDeleteModal(true)
    setIdToBeDeleted(wallets[index].id)
  }
 return(
    <>
    <EditWalletModal data={data} show={showModal}/>
    <Row className='mt-5'>
    {wallets.map((wallet,index)=>(
         <Col xs={12} md={6} lg={4}>
        <WalletCard key={wallet.id} wallet={wallet}
         deleteButton={<button className='red-button button-width-narrow' onClick={()=>handleDelete(index)}>Delete</button>} 
         editButton={<button className='button-styles button-width-narrow'onClick={()=>handleEdit(index)}>Edit</button>} />
         </Col>
    ))}
    </Row>
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='wallet'/>
    </>
 )
}
export default AdminWallet