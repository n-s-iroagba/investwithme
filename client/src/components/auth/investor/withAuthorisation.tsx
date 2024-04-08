import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { getAuthData } from '../../../utils/auth';



const withAuthorization = (WrappedComponent: React.FC<{ data: any }>) => {
  return () => {
    const navigate = useNavigate();
    const [authorisationData, setAuthorisationData] = useState({});
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const receivedToken: string | null = searchParams.get('token');
      if (receivedToken) {
        localStorage.setItem('cassockJwtToken', receivedToken);
      }
      const token = localStorage.getItem('cassockJwtToken');
      if (token) {
        const authData = getAuthData(token);
        if (authData) {
          setAuthorisationData(authData);
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    }, [navigate, location.search]);

    if (loading) {
      return <Spinner animation="border" />;
    }

    if (!authorisationData) {
      return (
        <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
          <div>You are not authorised to see this page</div>
          <button className='button-styles button-width-narrow mt-3' onClick={() => navigate('/login')}>Go To Login</button>
        </div>
      );
    }

    return <WrappedComponent data={authorisationData} />;
  };
};

export default withAuthorization;

