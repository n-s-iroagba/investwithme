import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { isAdminAuthorised } from '../../utils/auth';
import { AdminAuthorizationData } from '../../../utils/types';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';

const withAdminAuthorization = (WrappedComponent: React.FC<{name:string}>) => {
  return () => {
    const navigate = useNavigate();
    const [authorisationData, setAuthorisationData] = useState<AdminAuthorizationData|null>(null);
    const [name, setName]= useState<string>('');

    const location = useLocation();
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const receivedToken: string | null = searchParams.get('token');
      if (receivedToken) {
        localStorage.setItem('cassocKJwtToken', receivedToken);
      }
      const authData = getAuthData('admin'); // Assuming setUsername is a function to set the username
      setAuthorisationData(authData) 
      
    }, [setAuthorisationData,navigate, location.search]);

    if (!authorisationData?.authorised) {
      return (
        <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
          <div>You are not authorised to see this page</div>
          <button className='button-styles button-width-narrow mt-3' onClick={() => navigate('/login')}>Go To Login</button>
        </div>
      );
    }

    return <WrappedComponent  name = {authorisationData.name} />;
  };
};

export default withAdminAuthorization;
