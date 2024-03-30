import React from 'react'
import { Col, Card, Form, InputGroup, Row } from 'react-bootstrap'
import '../assets/Styles.css'
import { InvestmentType } from '../helpers/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Deposit from '../components/Deposit'
import { useEffect, useState } from 'react'

const Investment: React.FC<{ receivedInvestment: InvestmentType }> = ({ receivedInvestment }) => {
  const [isEditable, setIsEditable] = useState({
    wallet:{
      address:false,
      blockchain:true,
    }
  });
  const [deposited, setDeposited] = useState(false);
  const [lastManager, setLastManager] = useState(false)
  const [inCompleteDeposit, setInCompleteDeposit] = useState(false);
  const [investment, setInvestment] = useState(receivedInvestment)
  const [blockChainOptions, setBlockChainOptions] = useState([])
  const options = ['amoount', 'amoount']

  useEffect(() => {
    if (investment.amountDeposited > 0) {
      setDeposited(true)
    }
  },[investment.amountDeposited])

  const handleChange = (e: any) => {
    setInvestment({ ...investment, [e.target.name]: e.target.value })
  }

  const handleSelecChange = (e: any) => {
  }



  const toggleEditable = (key: string) => {
    setIsEditable((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  function addDaysToDateString(dateString: string): string {
    const date: Date = new Date(dateString);
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString(); // Or another desired format
  }
  const handleSubmit = () => {
    console.log('submit')
  }

  return<>
    
    <Card className=' w-100   text-light text-center border border-white'>
  
 

    </Card>


  </>
}
export default Investment