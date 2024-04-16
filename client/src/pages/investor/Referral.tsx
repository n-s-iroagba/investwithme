import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import Information from '../../components/general/Information';
import { faUsers } from '@fortawesome/free-solid-svg-icons';



const Referrals: React.FC = () => {
 const [code, setCode] = useState('')
 const [link,setLink] = useState('')


 const navigate = useNavigate()

  const fetchTextFromBackend = async () => {
    try {
      const response:any = await fetch('your-backend-url');
      const data = await response.data
      setCode(data.code);
      setLink(data.link)
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    fetchTextFromBackend(); 
  }, []);

 const referrals = ['a','c']
 const referrer ='aa'
  const handleCopyClick = () => {
    alert('Text copied to clipboard!');
    navigator.clipboard.writeText(code); 
  }
  const handleCopyClickLink = () => {
    alert('Text copied to clipboard!');
    navigator.clipboard.writeText(link); 
  };

  return (
   <div className="d-flex justify-content-center align-items-center flex-column my-5">
       <Information  text="Share either the link or the code with your friends, and you'll receive 20% of their initial investment profits.." head= "Refer and Earn" icon={faUsers} />
    <Form className="form py-5 " >       
   
        <Form.Group className='mb-5' controlId="validationFormik04">
          <Form.Label className='mb-0'>Referral Code</Form.Label>
          <Form.Control
            readOnly={true}
            value={code}
        className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

      <div className='d-flex justify-content-evenly w-100 pb-5'>
        <button onClick={handleCopyClick} className='button-styles w-50 text-light'>
         Copy Code
        </button>
      </div>
      <Form.Group className='mb-5' controlId="validationFormik04">
          <Form.Label className='mb-0'>Referral Link</Form.Label>
          <Form.Control
            readOnly={true}
            value={link}
        className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

      <div className='d-flex justify-content-evenly w-100 pb-5'>
        <button onClick={handleCopyClickLink} className='button-styles w-50 text-light'>
         Copy Link
        </button>
      </div>
      <Form.Group className='mb-4 border-0 border-top border-white'>
        <Form.Label className='mb-0'>Referrer:</Form.Label>
        <div>{referrer}</div>
        </Form.Group>
        <Form.Group className='my-4 border-0 border-top border-white'>
        <Form.Label className='mb-0'>Referrals:</Form.Label>
        {
          referrals.map((referral)=>(
            <div>{referral}</div>
          ))
        }
        </Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
       
        <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')}> Dashboard</button>
        
      
      </div>
    </Form>
    </div>
  );
};

export default Referrals;
