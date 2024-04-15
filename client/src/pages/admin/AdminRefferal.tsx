import React from 'react';
import ReferralCard from '../../components/admin/ReferralCard'; // Assuming this is the name of your card component

const AdminReferral = () => {
  const walletDataArray = [
    {
      walletAddress: '0x1234567890abcdef',
      amount: 100,
      id: 1,
    },
    {
      walletAddress: '0x9876543210fedcba',
      amount: 200,
      id: 2,
    },
    // Add more items as needed
  ];

  return (
    <div>
      {walletDataArray.map((walletData) => (
        <ReferralCard key={walletData.id} {...walletData} />
      ))}
    </div>
  );
};

export default AdminReferral;
