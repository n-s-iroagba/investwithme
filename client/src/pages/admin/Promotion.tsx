import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import PromoFormModal from '../../features/promo/components/PromoFormModal'
import MiniFooter from '../../common/components/MiniFooter'
import ExtendPromoFormModal from '../../features/promo/components/ExtendPromoModal'

import ErrorMessage from '../../common/components/ErrorMessage'
import { PromoDto } from '../../../../common/promoTypes'
import { formatStartDate } from '../../features/investment/utils/utils'
import '../../common/styles/styles.css'
import { getPromo } from '../../features/promo/helpers/promoApiHelpers'

const Promotion = () => {
    const [promo, setPromo] =useState<PromoDto|null>(null)
    const [showAddPromoModal, setShowAddPromoModal] = useState(false)
    const [showEditPromoModal, setShowEditPromoModal] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    useEffect(() => {
      const fetchPromoData = async () => {
        try {
          const receivedpromo = await getPromo();
          
          receivedpromo && setPromo(receivedpromo);
        
        } catch (error) {
          console.error('Error fetching promo:', error);
          setErrorMessage('Error fetching promo');
       
        }
      };
      
      fetchPromoData();
    }, []);
    
      
    return (
      <div className='primary-background'>
        <div className='d-flex pt-5 flex-column align-items-center text-light full-height'>{promo === null?
            (<div>
                <PromoFormModal show={showAddPromoModal}/>
                <h4>No active promo</h4>
                <button className='button-styles button-width-narrow mt-4 text-light' onClick={()=>setShowAddPromoModal(true)}>Create Promo</button>
            </div>):
            (promo&&
            <>
            <ExtendPromoFormModal id = {promo.id}show={showEditPromoModal} /><div className='px-1'>
            <h4 className='text-center'>Promo</h4>
            <Card style={{width:'8cm'}}>
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
         
         <ErrorMessage message={errorMessage}/>
         </div>
            <MiniFooter primaryVariant/>
</div>
    )

}
export default Promotion
