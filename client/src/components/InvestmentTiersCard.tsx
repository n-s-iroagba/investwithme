
import React from "react";
import { Card, Image} from "react-bootstrap";



interface InvestmentTiersType {
  title: string;
  image: string;
  name: string;
  minDeposit: string;

  duration: string;
  investbutton:React.ReactNode
}

export const InvestmentTiersCard: React.FC<InvestmentTiersType> = ({
  title,
  image,
  name,
  minDeposit,
  duration,
  investbutton,
}) => {
  return (
    <div className="px-4">
      <Card bg="light" text="black" className="w-100">
        <Card.Header className="background-secondary">
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Image src={image} alt="Card Image" roundedCircle />
          </div>
          <Card.Title className=" text-center w-100">{name}</Card.Title>
        <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-75 ">
       <Card.Text className='d-flex  align-items-center mb-0'><p className=' card-label-width-wide' >Minimum Amount:</p> <p >{minDeposit}</p></Card.Text>
       <Card.Text className='d-flex align-items-center mb-0'><p className='card-label-width-wide ' >Duration:</p> <p >{duration} </p></Card.Text>
       </div>
      </div>
       <div className="w-100 d-flex justify-content-center"><div className="w-75">{investbutton}</div></div>
        </Card.Body>
      </Card>
    </div>
  );
};


export default InvestmentTiersCard;