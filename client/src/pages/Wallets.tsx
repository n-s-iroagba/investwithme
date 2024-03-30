import React, { useState } from 'react'
import { Card,Form,Button} from 'react-bootstrap'
import '../assets/Styles.css'
import { GetStartedButton } from '../components/Button'
import { WalletType } from '../helpers/types'

const   Wallet :React.FC<WalletType> = (props) => {
  const [isEditable, setIsEditable] = useState(true);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };
    return<div className='text-light primary-background pb-3 px-3'>
        <div className='  py-3 text-center  mt-0'><h2 >Please select an investment manager to proceed with your deposit.</h2></div>
      <Card className=' text-light px-1.5 card-background card'>
      <Card.Body>
        <div className='d-flex flex-column align-items-center'>
        <div className='py-3 '>
        <Form>
        <Button variant="primary" onClick={toggleEditable}>
      hello
      </Button>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{props.type}</Form.Label>
        <Form.Control type="email" placeholder="Enter email" readOnly={!isEditable} />
      </Form.Group>
      </Form>
       </div>
       <GetStartedButton/>
       </div>
      </Card.Body>
    </Card>
    </div>
  
}
const Wallets:React.FC = ()=>{
  const wallets:WalletType[]=[{
    type:'BTC',
    address:'HELLO'
  }]
  
  
  return<div>{
     wallets.map((wallet,index)=>(
<Wallet
type = {wallet.type}
address={wallet.address}
/>
     ))
}</div>

     
  
}
export default Wallets