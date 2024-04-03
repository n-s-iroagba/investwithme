import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Information from '../../components/general/Information';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';


const TextWithCopy: React.FC = () => {
 const [walletAddress,setWalletAddress] = useState('')
 const [copied, setCopied] = useState(false)

 const navigate = useNavigate()

  // const fetchTextFromBackend = async () => {
  //   try {
  //     const response = await fetch('your-backend-url');
  //     const data = await response.text();
  //     setText(data);
  //   } catch (error) {
  //     console.error('Error fetching text:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTextFromBackend(); // Fetch text when component mounts
  // }, []);


  const handleCopyClick = () => {
    navigator.clipboard.writeText(walletAddress); // Copy text to clipboard
  };

  return (
   <div className="d-flex justify-content-center align-items-center flex-column my-5">
       <Information center= {true}text='' head='Copy the xx address and proceed to make a deposit.' icon={faHandHoldingDollar} />
    <Form className="form py-5 " >       
   
        <Form.Group className='mb-5' controlId="validationFormik04">
          <Form.Label className='mb-0'>Deposit To this wallet</Form.Label>
          <Form.Control
            readOnly={true}
            value={walletAddress}
        className=" custom-input bg-transparent form-control text-light"
          />
        {copied && <Form.Control.Feedback></Form.Control.Feedback>}
        </Form.Group>

      <div className='d-flex justify-content-evenly w-100 pb-5'>
        <button onClick={handleCopyClick} className='button-styles w-50 text-light'>
         Copy Address
        </button>
        <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')}> Back to Dashboard</button>
      </div>
  
    </Form>
    </div>
  );
};

export default TextWithCopy;
