import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import { required } from '../auth/general/required';
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import { CreateManagerType, ManagerType } from '../../utils/types';
import { createManager, getSingleManager, patchManager } from '../../utils/helpers';
import { hasEmptyKey } from '../../utils/utils'
import { useNavigate } from 'react-router-dom';




const ManagerForm: React.FC<{ patch?: boolean }> = ({ patch }) => {
  const initManagerData:CreateManagerType = {
    firstName: '',
    lastName: '',
    image: '',
    duration: 0,
    qualification: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
  };

  const [editedManagerData, setEditedManagerData] = useState<CreateManagerType>(initManagerData)
  const [managerData, setManagerData] = useState<ManagerType|CreateManagerType>({
    id:0,
    firstName: '',
    lastName: '',
    image: '',
    duration: 0, 
    qualification: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<any>(null)
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchManagerData = async () => {
      const id = localStorage.getItem('cassockManager')
      if (patch && id) {

        try {
          const manager = await getSingleManager(id);
          setManagerData(manager);
        } catch (error) {
          console.error(error);
          alert('an error occured, try again later')
          // navigate ('/admin/dashboard')
        }
      };
    }
    fetchManagerData();
  });

  function dataURLtoBlob(dataurl: string) {
    var arr = dataurl.split(',');
    var match = arr[0].match(/:(.*?);/);
    if (!match) {
      throw new Error('Invalid data URL');
    }
    var mime = match[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const getCroppedBlob = (file: File, crop: Crop) => {
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

          const aspectRatio = image.width / image.height;

          const canvasWidth = crop.width;
          const canvasHeight = crop.width / aspectRatio;

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;


          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);

          const croppedImage = canvas.toDataURL('image/jpeg', 1);


          const blobImage = dataURLtoBlob(croppedImage);

          resolve(blobImage);
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
      if (croppedBlob) {
        setManagerData((prevData) => ({
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
    setEditedManagerData((prevData) => ({
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
    // Assuming editedManagerData and managerData are already defined

    const updatedManagerData = {
      ...editedManagerData, // Copy all attributes from editedManagerData
      firstName: editedManagerData.firstName || managerData.firstName,
      lastName: editedManagerData.lastName || managerData.lastName,
      image:  managerData.image,
      duration: editedManagerData.duration || managerData.duration,
      qualification: editedManagerData.qualification || managerData.qualification,
      minimumInvestmentAmount: editedManagerData.minimumInvestmentAmount || managerData.minimumInvestmentAmount,
      percentageYield: editedManagerData.percentageYield || managerData.percentageYield,
    };
    console.log(updatedManagerData)
    // Now updatedManagerData contains the updated values

    e.preventDefault();
    let shouldNotSubmit =(patch && hasEmptyKey(managerData)) || managerData.image === null;
    console.log('shouldNotSubmit', shouldNotSubmit)
    try {
      if (shouldNotSubmit) {
        setValidated(false);
      } else {
        setSubmitting(true);
        setValidated(true);
        const formData = new FormData();
        Object.entries(updatedManagerData).forEach(([key, value]) => {
          formData.append(key, value);
        });;


        if (patch) {
          await patchManager(formData, navigate);
        } else {
          await createManager(formData);
        }
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrorMessage(
        error.message + '. Sorry we cannot complete your request at this time'
      );
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="d-flex justify-content-center flex-column align-items-center mt-5 px-2">
      {files && (
        <Modal show={show}>
          <ReactCrop circularCrop aspect={1} crop={crop} onChange={(c) => {
            setCrop(c)
          }}>
            <img className='w-100' src={URL.createObjectURL(files)} alt='as' />
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
             required ={patch?false:true}
              type="text"
              name="firstName"
              placeholder={managerData.firstName}
              value={editedManagerData.firstName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="mb-0">
              Last name{required}
            </Form.Label>
            <Form.Control 
             required ={patch?false:true}
              type="text"
              name="lastName"
              placeholder={managerData.lastName}
              value={editedManagerData.lastName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Qualification{required}</Form.Label>
          <Form.Control
              required ={patch?false:true}
            type="text"
            name="qualification"
            value={editedManagerData.qualification}
            placeholder={managerData.qualification}
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
            value={editedManagerData.percentageYield}
            placeholder={String(managerData.percentageYield)}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>
        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Duration {required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="duration"
            placeholder={managerData.duration + ''}
            value={editedManagerData.duration}
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
            value={editedManagerData.minimumInvestmentAmount}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

        <Form.Group as={Col} sm="12" className="mb-4" controlId="validationFormik05">
          <Form.Label className="mb-0">Manager's picture</Form.Label>
          <Form.Control
            type="file"
            formEncType='multipart/form-data'
            name="image"
            onChange={handleFileChange}
            className="custom-input text-light bg-transparent form-control"
          />
        </Form.Group>

        <div className="d-flex justify-content-evenly w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className="button-styles text-light w-50" onClick={() => console.log(managerData)}>Dashboard</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default ManagerForm;
