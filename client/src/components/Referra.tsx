import React from "react";
import { Row, Col,Card } from "react-bootstrap";
import PortfolioCard from "./PortfolioCard";


const Referra = () => {

  const referredUsers = ['wadup', 'Nnamdi']
  return (
    <div>
      <Row className=''>
        <Col lg={12}>
          <PortfolioCard title={'Referred By'} mainText={`Annabel Kojovic`} subText={``} />
        </Col>
        <Col>
          <Card className={` shade  round-card my-1 w-100`}>
            <Card.Body>
              <Card.Text >Referred</Card.Text>
              {
                referredUsers.map((user, index) => {
                  return (
                    <Card.Text key={index}>{user}</Card.Text>
                  )
                })
              }
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </div>)
}
export default Referra