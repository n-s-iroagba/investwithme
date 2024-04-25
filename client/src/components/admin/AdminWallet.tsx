import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../styles.css'
import { WalletType } from '../../utils/types';
import EditWalletModal from './EditWalletModal';
import DeleteModal from './DeleteModal';
import { getAdminWallets } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';


const WalletCard: React.FC<{ wallet: WalletType, deleteButton: React.ReactNode, editButton: React.ReactNode, }> = ({ wallet, deleteButton, editButton }) => {

  return (
    <div className='px-1'>
      <Card className={`shade  round-card my-1 w-100`}>
        <Card.Body>
          <Card.Text >{wallet.blockchain}</Card.Text>
          <Card.Title>{wallet.network}</Card.Title>
          <Card.Text>{wallet.currency}</Card.Text>
          <Card.Text>{wallet.address}</Card.Text>
          {editButton}
          <br />
          {deleteButton}
        </Card.Body>

      </Card>
    </div>
  )
}

const AdminWallet = () => {
  const [showModal, setShowModal] = useState(false)
  const [wallets, setWallets] = useState<WalletType[]>([])
  const [data, setData] = useState<WalletType>({
    id: 0,
    blockchain: '',
    address: '',
    network: '',
    currency: ''
  })
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const walletData = await getAdminWallets(); 
        setWallets(walletData);
      } catch (error) {
        console.error(error);
        alert ('an error occured, try again later')
        // navigate ('/admin/dashboard')
      }
    };

    fetchWalletData(); // Call the async function to fetch data
  }, [navigate]);

  const handleEdit = (wallet: WalletType) => {
    setShowModal(true)
    setData(wallet)
  }

  const handleDelete = (id: number) => {
    setShowDeleteModal(true)
    setIdToBeDeleted(id)

  }
  return (
    <>
      <EditWalletModal data={data} show={showModal} />
      <Row className='mt-5'>
        {wallets.length > 0 ? wallets.map((wallet, index) => (
          <Col className={wallets.length === 1 ? 'w-100' : ''} xs={12} md={6} lg={4}>
            <WalletCard key={wallet.id} wallet={wallet}
              deleteButton={<button className='red-button button-width-narrow' onClick={() => handleDelete(wallet.id)}>Delete</button>}
              editButton={<button className='button-styles button-width-narrow' onClick={() => handleEdit(wallet)}>Edit</button>} />
          </Col>
        ))
          : <h2 className='text-light text-centet'> No Wallets Added yet.</h2>
        }
      </Row>
      <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='wallet' />
    </>
  )
}
export default AdminWallet