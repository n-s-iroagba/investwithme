import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../styles.css'
import { WalletType } from '../../utils/types';
import EditWalletModal from './EditWalletModal';
import DeleteModal from './DeleteModal';
import { getAdminWallets } from '../../utils/adminWalletHelper';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../general/ErrorMessage';


const WalletCard: React.FC<{ wallet: WalletType, deleteButton: React.ReactNode, editButton: React.ReactNode, }> = ({ wallet, deleteButton, editButton }) => {

  return (
    <div className='px-1'>
      <Card className={`shade  round-card my-1 w-100`}>
        <Card.Body>
          <small>Blockchain:</small>
          <Card.Text >{wallet.blockchain}</Card.Text>
          <small>Network:</small>
          <Card.Text>{wallet.network}</Card.Text>
          <small>Currency:</small>
          <Card.Text>{wallet.currency}</Card.Text>
          <small>Address:</small>
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
  const [errorMessage, setErrorMessage] = useState('')
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
        if (walletData === false) {
          navigate('/login')
        }
        walletData && setWallets(walletData);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching wallets');

      }
    };

    fetchWalletData();
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
          : <>
            <h2 className='text-light text-center'> No Wallets Added yet.</h2>
            <div className='d-flex justify-content-center'>
              <button className='button-width-narrow button-styles my-4 text-light' onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
            </div>
            <ErrorMessage message={errorMessage} />
          </>
        }
      </Row>
      <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='wallet' />
    </>
  )
}
export default AdminWallet