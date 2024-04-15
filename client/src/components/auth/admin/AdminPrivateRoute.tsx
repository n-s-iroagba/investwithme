import React, { useState } from 'react';
import AdminSignUp from '../../../pages/admin/AdminSignUp';

const AdminPrivateRoute: React.FC<{ Component: React.FC<any> }> = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (
    isAuthenticated ? (
      <Component name={'Amos'} /> // Pass the name prop to AdminDashboard
    ) : (
      <AdminSignUp />
    )
  );
};

export default AdminPrivateRoute;