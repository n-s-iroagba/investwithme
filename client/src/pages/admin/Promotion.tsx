import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import PromoFormModal from '../../components/admin/PromoFormModal'


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
        <div>{promo.id === 0?
            (<div>
                <PromoFormModal show={showAddPromoModal}/>
                <h4>No active promo</h4>
                <button onClick={()=>setShowAddPromoModal(true)}>Create Promo</button>
            </div>):
            (
            <div className='px-1'>
                <Card className={` shade  round-card my-1 w-100`}>
                    <Card.Body>
                        <Card.Text >From : {promo.startDate}</Card.Text>
                        <Card.Title>To: {promo.endDate}</Card.Title>
                        <button className='button-styles'>Extend Promo</button>
                        <button>Delete Promo</button>
                    </Card.Body>
                </Card>
            </div>
            )

         }</div>
    )

}
export default Promotion
