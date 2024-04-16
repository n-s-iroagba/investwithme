import React, { useState } from 'react';
import { Row, Col,Form, Modal } from 'react-bootstrap';
import { InvestmentTiersCard } from '../../components/general/InvestmentTiersCard';
import {  MoveToPatchManager } from '../../components/general/Button';

import { MiniFooter } from '../../components/home_components/Footer';
import { ManagerType } from '../../utils/types';
import '../../components/styles.css'
import DeleteModal from './DeleteModal';


const DeleteManagerModal:React.FC<{propShow:boolean}>= ({propShow})=>{
    const [show, setShow] = useState(propShow);
  
    const handleClose = () => setShow(false);  
    return (
      <>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          
        </Modal>
      </>
    );
  }

const AdminInvestmentManagersCard: React.FC = () => {
    const [idToBeDeleted, setIdToBeDeleted] = useState(0)
    const [showDeleteModal,setShowDeleteModal]= useState(false)
    const managerData:ManagerType[] = [
        {
            id: 1,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            qualification:'Chartered Financial Analyst',
            lastName: "Glasgow",
            minimumInvestmentAmount: 500,
            duration: 2,
        },
        {
            id: 2,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            lastName: "Glasgow",
            qualification:'Chartered Wealth Manager',
            minimumInvestmentAmount: 500,
            duration: 2,
        },
        {
            id: 3,
            percentageYield: 150,
            image: "https://via.placeholder.com/150",
            firstName: "Annabel",
            lastName: "Glasgow",
            qualification: 'MSc Finance',
            minimumInvestmentAmount: 500,
            duration: 2
        }
    ];

  
      const handleDelete =(index:number) =>{
        setShowDeleteModal(true)
        setIdToBeDeleted(managerData[index].id)
      }

    return (
        <>
            {managerData.length > 0?
                <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        Your Managers
                    </h3>
                </Col>

                {managerData.map((data,index) => (
                    <Col xs={12} md={6} lg={4}>
                        <InvestmentTiersCard
                         key={data.id}
                            percentageYield={`${data.percentageYield}% RETURN ON INVESTMENT`}
                            image={data.image}
                            firstName={data.firstName}
                            lastName={data.lastName}
                            qualification={data.qualification}
                            minimumInvestmentAmount={`$${data.minimumInvestmentAmount}`}
                            duration={`${data.duration} weeks`}
                            button={<MoveToPatchManager manager={data} />}
                            deleteButton={<button className='red-button' onClick={()=>handleDelete(index)}>Delete Manager</button>}
                        />





                    </Col>
                ))}
                 <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='manager'/>
            </Row>
            :
            <h3 className='text-center mt-4 text-light'>
                No Managers yet, kindly add a manager.
                </h3>
            }
            
            <MiniFooter primaryVariant={true} />
        </>
    );
};

export default AdminInvestmentManagersCard