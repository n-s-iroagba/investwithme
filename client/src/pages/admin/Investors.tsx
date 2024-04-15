import React from 'react';
import InvestorsCard from '../../components/admin/InvestorsCard'; // Adjust the path as per your project structure


const Investors = () => {
  const data = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      InvestmentStatus: 'Interested'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      InvestmentStatus: 'Not Interested'
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      InvestmentStatus: 'Invested'
    }
  ];

  return (
    <div>
      {data.map((investor) => (
        <InvestorsCard
          key={investor.id}
          firstName={investor.firstName}
          lastName={investor.lastName}
          investmentStatus={investor.InvestmentStatus}
          id={investor.id}
        />
      ))}
    </div>
  );
};
export default Investors;