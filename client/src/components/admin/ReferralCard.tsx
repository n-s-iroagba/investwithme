import React from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ReferralCard: React.FC<{ walletAddress: string; amount: number; id: number }> = ({ walletAddress, amount, id }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderTooltip = (props: any) => <Tooltip {...props}>Address copied</Tooltip>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Wallet Information</Card.Title>
        <Card.Text>
          Wallet Address: {walletAddress}
          <br />
          Amount: {amount}
        </Card.Text>
        <Button variant="primary" onClick={() => copyToClipboard(walletAddress)}>
          Copy Address
        </Button>
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <Button variant="primary">Show Tooltip</Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default ReferralCard;
