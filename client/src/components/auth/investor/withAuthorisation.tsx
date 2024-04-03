import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { isAuthorised } from '../../utils/auth';

const withAuthorization = (WrappedComponent: React.FC<{ authorised: boolean,data:any}>) => {
  return () => {
    const navigate = useNavigate();
    const [authorised, setAuthorised] = useState<boolean>(true);
    const [data,setData] = useState<any>({})

    const location = useLocation();
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const receivedToken: string | null = searchParams.get('token');
      if (receivedToken) {
        localStorage.setItem('cAssocKJwtToken', receivedToken);
      }
      const isAuth = isAuthorised('investor'); // Assuming setUsername is a function to set the username
      setAuthorised(isAuth.authorised);
      setData(isAuth.data);
    }, [setAuthorised, navigate, location.search]);

    if (!authorised) {
      return (
        <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
          <div>You are not authorised to see this page</div>
          <button className='button-styles button-width-narrow mt-3' onClick={() => navigate('/login')}>Go To Login</button>
        </div>
      );
    }

    return <WrappedComponent authorised={authorised} data={data} />;
  };
};

export default withAuthorization;
