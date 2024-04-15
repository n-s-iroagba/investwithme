import React from 'react';
import { Card, Button } from 'react-bootstrap';

const InvestorsCard:React.FC<{firstName:string,lastName:string,investmentStatus:string,id:number}> = ({ firstName, lastName, investmentStatus, id }) => {
  const handleButtonClick = (id:number) => {
    // Handle button click event, e.g., navigate to details page using the id
    console.log(`Button clicked for investor with id: ${id}`);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Text>Investment Status: {investmentStatus}</Card.Text>
        <Button variant="primary" onClick={() => handleButtonClick(id)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InvestorsCard;
