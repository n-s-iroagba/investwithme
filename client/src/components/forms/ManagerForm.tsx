import React, { useState} from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import { required } from '../auth/general/required';
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import { ManagerType } from '../../utils/types';
import { createManager, hasEmptyKey, patchManager } from '../../utils/helpers';



const ManagerForm: React.FC<{ patch?: boolean }> = ({ patch }) => {
  const initialManagerData = patch
    ? JSON.parse(localStorage.getItem('cassockManager') || 'null') || {
        firstName: '',
        lastName: '',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      }
    : {
        firstName: '',
        lastName: '',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      };

  const [managerData, setManagerData] = useState<ManagerType>(initialManagerData);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<any>(null)
  const [validated,setValidated] = useState(false)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 150,
    height: 150,
  })




  const getCroppedBlob = async (file: File, crop: Crop): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target?.result as string; // Set the image source here

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Failed to get 2D context from canvas'));
            return;
          }

          canvas.width = crop.width;
          canvas.height = crop.height;

          // Use imageRef.current for correct image rendering (optional)
          // ctx.drawImage(imageRef.current!, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

          ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height); // Use the loaded image

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create Blob from canvas'));
              return;
            }
            resolve(blob);
          }, file.type);
        };
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  };

  const done = async () => {
    if (!files) {
      console.error('No file selected for cropping');
      return;
    }

    try {
      const croppedBlob = await getCroppedBlob(files, crop);
      setManagerData((prevData) => ({
        ...prevData,
        image: croppedBlob,
      }));
      console.log('Image cropped successfully!');
    } catch (error) {
      console.error('Error cropping image:', error);
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
          await patchManager(managerData);
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
        <ReactCrop circularCrop aspect={1} crop={crop} onChange={c => setCrop(c)}>
          <img src={URL.createObjectURL(files)} alt='as' />
          <button onClick={done}>Done</button>
        </ReactCrop>

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
          <button className="button-styles text-light w-50">Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default ManagerForm;
