
import React from "react";
import { Card, Image} from "react-bootstrap";
import { InvestmentTiersType } from "../../utils/types";




export const InvestmentTiersCard: React.FC<InvestmentTiersType> = ({
  percentageYield,
  image,
  firstName,
  lastName,
  minimumInvestmentAmount,
  duration,
  button,
  deleteButton,
}) => {
  return (
   
      <Card bg="light" text="black" className="w-100">
        <Card.Header className="background-secondary">
          <Card.Title className="text-center">{percentageYield}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Image src={image} alt="Card Image" roundedCircle />
          </div>
          <Card.Title className=" text-center w-100">{firstName + ' ' + lastName}</Card.Title>
        <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 ">
       <Card.Text className='d-flex  align-items-center mb-0'><p className=' card-label-width-wide' >Minimum Amount:</p> <p >{minimumInvestmentAmount}</p></Card.Text>
       <Card.Text className='d-flex align-items-center mb-0'><p className='card-label-width-wide ' >Duration:</p> <p >{duration} </p></Card.Text>
       </div>
      </div>
       <div className="w-100 d-flex justify-content-center"><div className="w-75">{button}</div></div>
       {deleteButton && <div className="w-100 py-3 d-flex justify-content-center"><div className="w-75">{deleteButton}</div></div>}
        </Card.Body>
      </Card>
   
  );
};


export default InvestmentTiersCard;