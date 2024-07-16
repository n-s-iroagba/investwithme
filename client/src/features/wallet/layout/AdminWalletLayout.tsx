import React, {useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../common/styles/styles.css'
import EditWalletModal from '../components/EditWalletModal';
import DeleteModal from '../../../common/components/DeleteModal';
import WalletCard from  '../components/WalletCard'

import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../common/components/ErrorMessage';

import { WalletDto } from '../../../../../common/walletTypes';
import useGetAdminWallets from '../hooks/useGetAdminWallet';
import LoadingSpinner from '../../../common/components/LoadingSpinner';


const AdminWalletLayout = () => {
  const [showModal, setShowModal] = useState(false)

  const [walletToBeEdited, setWalletToBeDeleted] = useState<WalletDto|null>(null)
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()

  const {wallets, errorMessage}  = useGetAdminWallets()
  const handleEdit = (wallet: WalletDto) => {
    setShowModal(true)
    setWalletToBeDeleted(wallet)
  }

  const handleDelete = (id: number) => {
    setShowDeleteModal(true)
    setIdToBeDeleted(id)

  }
  return (
<>
  {wallets === null ? (
    <LoadingSpinner primaryBackground/>
  ) : (
    <>
      {walletToBeEdited && <EditWalletModal data={walletToBeEdited} show={showModal} />}
      <Row className='mt-5'>
        {wallets.length > 0 ? (
          wallets.map((wallet, index) => (
            <Col key={wallet.id} className={wallets.length === 1 ? 'w-100' : ''} xs={12} md={6} lg={4}>
              <WalletCard 
                {...wallet}
                deleteButton={<button className='red-button button-width-narrow' onClick={() => handleDelete(wallet.id)}>Delete</button>}
                editButton={<button className='button-styles button-width-narrow' onClick={() => handleEdit(wallet)}>Edit</button>} 
              />
            </Col>
          ))
        ) : (
          <>
            <h2 className='text-light text-center'>No Wallets Added yet.</h2>
            <div className='d-flex justify-content-center'>
              <button className='button-width-narrow button-styles my-4 text-light' onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
            </div>
            <ErrorMessage message={errorMessage} />
          </>
        )}
      </Row>
      <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='wallet' />
    </>
  )}
</>

  )
}
export default AdminWalletLayout