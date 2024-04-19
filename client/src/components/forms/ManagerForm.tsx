import React, { useState} from 'react';
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import { required } from '../auth/general/required';
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import { ManagerType } from '../../utils/types';
import { createManager, patchManager } from '../../utils/helpers';
import { hasEmptyKey} from '../../utils/utils'
import { useNavigate } from 'react-router-dom';




const ManagerForm: React.FC<{ patch?: boolean }> = ({ patch }) => {
  const initialManagerData = patch
    ? JSON.parse(localStorage.getItem('cassockManager') || 'null') || {
        firstName: '',
        lastName: '',
        image:'',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      }
    : {
        firstName: '',
        lastName: '',
        image:'',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      };

  const [managerData, setManagerData] = useState<ManagerType>(initialManagerData);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<any>(null)
  const [validated,setValidated] = useState(false)
  const [show,setShow] = useState(false)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', 
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  })
 const navigate = useNavigate()

 const getCroppedBlob = (file: File, crop: Crop): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target?.result as string; // Set the image source here

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Unable to get 2d context');
          return;
        }

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(image, crop.x, crop.y, 200, 200, 0, 0, crop.width, crop.height); 
        const croppedImage = canvas.toDataURL('image/jpeg', 1);
        resolve(croppedImage);
      };
    };

    reader.onerror = () => {
      console.error('Error reading file');
      reject('Error reading file');
    };

    reader.readAsDataURL(file);
  });
};

const done = async () => {
  if (!files) {
    console.error('No file selected for cropping');
    return;
  }
  setShow(false);

  try {
    const croppedBlob = await getCroppedBlob(files, crop);
    if(croppedBlob) {
      console.log(croppedBlob);
      setManagerData((prevData: ManagerType) => ({
        ...prevData,
        image: croppedBlob,
      }));
      console.log('Image cropped successfully!');
    } 
  } catch (error) {
    console.error(error);
  }
};

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(true)
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let shouldNotSubmit = hasEmptyKey(managerData)||managerData.image == null
    try {
      if (shouldNotSubmit) {
        setValidated(false);
      } else {
        setSubmitting(true);
        setValidated(true);
        if (patch) {
          await patchManager(managerData,navigate);
        } else {
          await createManager(managerData);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Sorry we can not complete your request at this time');
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center mt-5 px-2">
      {files && (
        <Modal show={show}>
        <ReactCrop circularCrop aspect={1} crop={crop} onChange={(c) => {setCrop(c)
        }}>
          <img  className='w-100' src={URL.createObjectURL(files)} alt='as' />
        </ReactCrop>
        <button onClick={done}>Done</button>
        </Modal>
      )}
      <Form className="form py-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className="mb-0">
              First name{required}
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={managerData.firstName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="mb-0">
              Last name{required}
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              value={managerData.lastName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Qualification{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="qualification"
            value={managerData.qualification}
            onChange={handleChange}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Percentage Yield{required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="percentageYield"
            value={managerData.percentageYield}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Minimum Investment Amount{required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="minimumInvestmentAmount"
            value={managerData.minimumInvestmentAmount}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

        <Form.Group as={Col} sm="12" className="mb-4" controlId="validationFormik05">
          <Form.Label className="mb-0">Manager's picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
            className="custom-input text-light bg-transparent form-control"
          />
        </Form.Group>

        <div className="d-flex justify-content-evenly w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'submit' : 'submit'}>
          {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className="button-styles text-light w-50" onClick={()=>console.log(managerData)}>Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default ManagerForm;
