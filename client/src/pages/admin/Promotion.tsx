import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import PromoFormModal from '../../components/admin/PromoFormModal'
import { MiniFooter } from '../../components/home_components/Footer'


const Promotion = () => {
    const [promo, setPromo] =useState({
        id:0,
        startDate:'',
        endDate:''
    })
    const [showAddPromoModal, setShowAddPromoModal] = useState(false)
    useEffect(() => {
        const receivedpromo = {
          id: 0,
          startDate: new Date('2021-01-01').toDateString(),
          durationInDays: 30,
        };
    
        const endDate = new Date(receivedpromo.startDate);
        endDate.setDate(endDate.getDate() + receivedpromo.durationInDays);
    
        setPromo({
          id: receivedpromo.id,
          startDate: receivedpromo.startDate,
          endDate: endDate.toDateString(),
        });
      }, [])
      
    return (
        <div className='d-flex pt-5 flex-column align-items-center text-light primary-background full-height'>{promo.id === 0?
            (<div>
                <PromoFormModal show={showAddPromoModal}/>
                <h4>No active promo</h4>
                <button className='button-styles button-width-narrow mt-4' onClick={()=>setShowAddPromoModal(true)}>Create Promo</button>
            </div>):
            (
            <div className='px-1'>
                <h4 className='text-center'>Promo</h4>
                <Card className={` shade`}>
                    <Card.Body>
                        <Card.Title className='mb-4'>From : {promo.startDate}</Card.Title>
                        <Card.Title className='mb-4'>To: {promo.endDate}</Card.Title>
                        <button className='button-styles mb-4'>Extend Promo</button>
                    </Card.Body>
                </Card>
            </div>
            )
         }
           <MiniFooter primaryVariant/>
         </div>
    )

}
export default Promotion
