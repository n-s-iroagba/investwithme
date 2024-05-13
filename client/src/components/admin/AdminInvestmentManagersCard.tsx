import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import { ManagerType } from '../../utils/types';
import '../../components/styles.css';
import DeleteModal from './DeleteModal';
import { getManagers } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const MoveToPatchManager: React.FC<{ manager: ManagerType }> = ({ manager }) => {
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
  const [managers, setManagers] = useState<ManagerType[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers(); 
        console.log(managerData)// Wait for the data to be fetched
        managerData && setManagers(managerData);
        console.log(managerData)
      } catch (error) {
        console.error(error);
        alert ('an error occured, try again later')
        // navigate ('/admin/dashboard')
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
              <Col xs={12} md={6} lg={3} >
                <InvestmentTiersCard
                  key={manager.id}
                  percentageYield={`${manager.percentageYield}%`}
                  image={manager.image}
                  firstName={manager.firstName}
                  lastName={manager.lastName}
                  qualification={manager.qualification}
                  minimumInvestmentAmount={`$${manager.minimumInvestmentAmount}`}
                  duration={`${manager.duration} weeks`}
                  button={<MoveToPatchManager manager={manager} />}
                  deleteButton={<button className='red-button' onClick={() => handleDelete(manager.id)}>Delete Manager</button>}
                />
              </Col>
            ))}
          </Row>
          <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='manager' />
        </>
      ) : (
        <h3 className='text-center mt-4 text-light'>
          No Managers yet, kindly add a manager.
        </h3>
      )}
    </div>
  );
};

export default AdminInvestmentManagersCard;
