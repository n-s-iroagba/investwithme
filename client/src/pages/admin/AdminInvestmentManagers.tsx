import React from  'react';
import { ManagerType } from '../../utils/types';
import EditManagerAccordion from '../../components/forms/EditManagerAccordion ';

const AdminManager: React.FC = () => {
  const managers: ManagerType[] = [
      {    id:1,
          firstName: "John",
          lastName: "Smith",
          minimumInvestmentAmount: 10000,
          percentageYield: 8,
          duration: "1 year",
          image: "path/to/manager1-image.jpg",
          qualification: "Certified Financial Analyst"
      },
      {id:2,
          firstName: "Alice",
          lastName: "Johnson",
          minimumInvestmentAmount: 5000,
          percentageYield: 6,
          duration: "6 months",
          image: "path/to/manager2-image.jpg",
          qualification: "MBA in Finance"
      }
  ];

  return (
      <>
          {managers.map((manager, index) => (
            <div key={index}>
              <EditManagerAccordion manager={manager} />
            </div>
            
          ))}
      </>
  );
};

export default AdminManager;
