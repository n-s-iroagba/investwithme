import React from "react";
import { Card, Container,Image,Row,Col} from "react-bootstrap";
import Line from "../line/Line";

interface InvestmentTiersProps {
  title: string;
  image: string;
  name: string;
  minDeposit: string;
  maxDeposit: string;
  duration: string;
  children?: React.ReactNode;
}

export const InvestmentTiersCard: React.FC<InvestmentTiersProps> = ({
  title,
  image,
  name,
  minDeposit,
  maxDeposit,
  duration,
  children,
}) => {
  return (
    <Container className="my-3">
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Header style={{ backgroundColor: "var(--secondary-color)"}}>
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Image src={image} alt="Card Image" roundedCircle />
          </div>
          <Card.Title className="my-3 text-center">{name}</Card.Title>
          <Card.Text className="text-center">Minimum Deposit: ${minDeposit}</Card.Text>
          <Card.Text className="text-center">Maximum Deposit: ${maxDeposit}</Card.Text>
          <Card.Text className="text-center">Investment Duration: {duration}</Card.Text>
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
};


const InvestmentTiers: React.FC = () => {
  return (
    <div className="InvestmentTiers d-flex justify-content-center flex-column align-items-center">
      <h2 className="text-center" >Investment Tiers and Fund Managers</h2><Line/>

    <Col xs={12}>
      <InvestmentTiersCard
        title="150% RETURNS"
        image="https://via.placeholder.com/150"
        name="Anna Glasgow"
        minDeposit="500"
        maxDeposit="10000"
        duration="1 year"
      >
      </InvestmentTiersCard>
      </Col>
    </div>
  );
};

export default InvestmentTiers;