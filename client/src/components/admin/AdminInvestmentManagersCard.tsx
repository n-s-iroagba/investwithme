import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import { ManagerData } from '../../../../common/types'
import '../../components/styles.css';
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../general/ErrorMessage';
import { getManagers } from '../../utils/managerHelper';

export const MoveToPatchManager: React.FC<{ manager: ManagerData }> = ({ manager }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    localStorage.setItem('cassockManager', JSON.stringify(manager.id));
    navigate('/patch-manager');
  };

  return (
    <button onClick={handleInvestClick} className='button-styles'>
      <div>Update This Manager</div>
      <div><FontAwesomeIcon icon={faDollarSign} beatFade /></div>
    </button>
  );
};


const AdminInvestmentManagersCard: React.FC = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [managers, setManagers] = useState<ManagerData[]>([]);
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers();
        managerData && setManagers(managerData);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error! Can not fetch managers at this time.')
      }
    };

    fetchManagerData(); // Call the async function to fetch data
  }, [navigate]);

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setIdToBeDeleted(id);
  };

  return (
    <div>
      {managers.length > 0 ? (
        <>
          <h3 className='text-center mt-4 text-light'>
            Your Managers
          </h3>
          <Row className='d-flex justify-content-center mt-2 gy-3'>
            {managers.map((manager) => (
              <Col key={manager.id} xs={12} md={6} lg={3}>
                <InvestmentTiersCard
                  percentageYield={`${manager.percentageYield}%`}
                  image={manager.image}
                  firstName={manager.firstName}
                  lastName={manager.lastName}
                  qualification={manager.qualification}
                  minimumInvestmentAmount={`$${manager.minimumInvestmentAmount}`}
                  duration={`${manager.duration} weeks`}
                  button={<MoveToPatchManager manager={manager} />}
                  deleteButton={
                    <button className='red-button' onClick={() => handleDelete(manager.id)}>
                      Delete Manager
                    </button>
                  }
                />
              </Col>
            ))}
          </Row>
          <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='manager' />
        </>
      ) : (
        <>
          <h3 className='text-center mt-4 text-light'>
            No Managers yet, kindly add a manager.
          </h3>
          <div className='d-flex justify-content-center mt-5'>
            <button className='button-styles button-width-narrow text-light' onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          </div>
          <ErrorMessage message={errorMessage} />
        </>
      )}
    </div>
  );
}

export default AdminInvestmentManagersCard;
