import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import PromoFormModal from '../../components/admin/PromoFormModal'
import { MiniFooter } from '../../components/home_components/Footer'
import { getPromo } from '../../utils/helpers'
import ExtendPromoFormModal from '../../components/admin/ExtendPromoModal'
import { PromoType } from '../../utils/types'
import { formatStartDate } from '../../utils/utils'


const Promotion = () => {
    const [promo, setPromo] =useState<PromoType|null>(null)
    const [showAddPromoModal, setShowAddPromoModal] = useState(false)
    const [showEditPromoModal, setShowEditPromoModal] = useState(false)
    useEffect(() => {
      const fetchPromoData = async () => {
        try {
          const receivedpromo = await getPromo();
          
          receivedpromo && setPromo(receivedpromo);
        
        } catch (error) {
          console.error('Error fetching promo:', error);
          // Handle the error as needed
        }
      };
      
      fetchPromoData();
    }, []);
    
      
    return (
      <div className='primary-background'>
        <div className='d-flex pt-5 flex-column align-items-center text-light primary-background full-height'>{promo === null?
            (<div>
                <PromoFormModal show={showAddPromoModal}/>
                <h4>No active promo</h4>
                <button className='button-styles button-width-narrow mt-4 text-light' onClick={()=>setShowAddPromoModal(true)}>Create Promo</button>
            </div>):
            (promo&&
            <>
            <ExtendPromoFormModal id = {promo.id}show={showEditPromoModal} /><div className='px-1'>
            <h4 className='text-center'>Promo</h4>
            <Card className={` shade`}>
              <Card.Body>
                <Card.Title className='mb-4'>From : {formatStartDate(promo.startDate)}</Card.Title>
                <Card.Title className='mb-4'>To: {formatStartDate(promo.endDate)}</Card.Title>
                <Card.Title className='mb-4'>Bonus Percentage :{promo.bonusPercent}</Card.Title>
                <button className='button-styles mb-4'onClick={()=>setShowEditPromoModal(true)}>Extend Promo</button>
              </Card.Body>
            </Card>
          </div></>
            )
         }
         </div>
            <MiniFooter primaryVariant/>
</div>
    )

}
export default Promotion
