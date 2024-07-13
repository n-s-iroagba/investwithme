import React from 'react';
import { Card } from 'react-bootstrap';
import '../../../common/styles/styles.css'
import { WalletCardProps } from '../types/props/props';

const WalletCard: React.FC<WalletCardProps> = ({ currency, address, editButton, deleteButton }) => {
  return (
    <div className='px-1'>
      <Card className='shade round-card my-1 w-100'>
        <Card.Body>
          <small>Currency:</small>
          <Card.Text>{currency}</Card.Text>
          <small>Address:</small>
          <Card.Text>{address}</Card.Text>
          {editButton && <div>{editButton}</div>}
          {deleteButton && <div>{deleteButton}</div>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default WalletCard;


