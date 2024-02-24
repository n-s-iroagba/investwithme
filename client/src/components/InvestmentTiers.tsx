import React from "react";
import { Card, Image} from "react-bootstrap";


interface InvestmentTiersType {
  title: string;
  image: string;
  name: string;
  minDeposit: string;
  maxDeposit: string;
  duration: string;
}

export const InvestmentTiersCard: React.FC<InvestmentTiersType> = ({
  title,
  image,
  name,
  minDeposit,
  maxDeposit,
  duration,
}) => {
  return (
    <div className="px-4">
      <Card bg="light" text="black" style={{ width: "8cm" }}>
        <Card.Header className="background-secondary">
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Image src={image} alt="Card Image" roundedCircle />
          </div>
          <Card.Title className=" text-center">{name}</Card.Title>
       <Card.Text className='d-flex  align-items-center text-center  mb-0'><p className=' card-label-width-wide' >Minimum Amount:</p> <p >$1,600,000</p></Card.Text>
       <Card.Text className='d-flex align-items-center  text-center mb-0'><p className='card-label-width-wide' >Maximum Amount:</p> <p >$6,000</p></Card.Text>
       <Card.Text className='d-flex align-items-center  text-center mb-0'><p className='card-label-width-wide' >Duration:</p> <p >2 weeks</p></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};


const InvestmentTiers: React.FC = () => {
  return (
    <div className="pt-2 px-4">
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h2 className="text-center" >Investment Tiers and Fund Managers</h2>
     <div className="primary-line mb-4"></div>
    </div>
    <div className="d-flex justify-content-center flex-column align-items-center">
      <InvestmentTiersCard
        title="150% RETURNS"
        image="https://via.placeholder.com/150"
        name="Anna Glasgow"
        minDeposit="500"
        maxDeposit="10000"
        duration="1 year"
     />
    </div>  
     
    </div>
  );
};

export default InvestmentTiers;