import React, { useEffect, useState } from 'react';
import AdminSignUp from '../../../pages/admin/AdminSignUp';
import { useNavigate } from 'react-router-dom';
import { getAdminAuthData } from '../../../utils/auth';

const AdminPrivateRoute: React.FC<{ Component: React.FC<any> }> = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [username,setUsername] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('cassockJwtToken', token);
      localStorage.setItem('cassockVerified', 'true');
    }
    const authData = getAdminAuthData()
    if (authData) {
        setUsername(authData.username)
        setIsAuthenticated(true)
    }else{
      navigate('/login')
    }
  }, [navigate])

  return (
    isAuthenticated ? (
      <Component username={username} /> // Pass the name prop to AdminDashboard
    ) : (
      <AdminSignUp />
    )
  );
};

export default AdminPrivateRoute;