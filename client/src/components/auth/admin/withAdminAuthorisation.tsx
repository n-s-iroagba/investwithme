import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { isAdminAuthorised } from '../../utils/auth';

const withAdminAuthorization = (WrappedComponent: React.FC<{ authorised: boolean,name:string }>) => {
  return () => {
    const navigate = useNavigate();
    const [authorised, setAuthorised] = useState<boolean>(true);
    const [name, setName]= useState<string>('');

    const location = useLocation();
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const receivedToken: string | null = searchParams.get('token');
      if (receivedToken) {
        localStorage.setItem('cAssocKJwtToken', receivedToken);
      }
      const isAuth = isAdminAuthorised('admin'); // Assuming setUsername is a function to set the username
      setAuthorised(isAuth.authorised) 
      setName(isAuth.name);
    }, [setAuthorised, setName ,navigate, location.search]);

    if (!authorised) {
      return (
        <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
          <div>You are not authorised to see this page</div>
          <button className='button-styles button-width-narrow mt-3' onClick={() => navigate('/login')}>Go To Login</button>
        </div>
      );
    }

    return <WrappedComponent authorised={authorised} name = {name} />;
  };
};

export default withAdminAuthorization;
