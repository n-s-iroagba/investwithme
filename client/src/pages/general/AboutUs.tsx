import React from "react";
import Information from "../../components/general/Information";
import { companyName } from "../../utils/constants";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import image from '../../assets/images/artboard (1).webp'
import { MiniFooter } from "../../components/home_components/Footer";
import Contact from "../../components/home_components/Contact";



const AboutUs:React.FC = ()=>{
    return<div className="d-flex flex-column align-items-center px-5 pt-4">
        <h1>About Us</h1>
        <div className='primary-line mb-2' />
        <Row>

        <Col xs={12} md={6}><img src={image} className="w-100 pt-3" alt='about-us'/></Col>
        <Col>
        <Information head={''} text={`
Welcome to ${companyName}, where your financial success is our top priority. 
With over 10 years of collective experience, our expert investment managers bring a wealth of knowledge and a proven track record across diverse asset classes, including equities, fixed income, 
and alternative investments. We leverage cutting-edge technology and data analytics to uncover opportunities and manage risks, ensuring your investments are poised for growth. 
Our client-centric approach means we tailor strategies to your unique financial goals, maintaining transparency and open communication throughout our partnership. 
At ${companyName}, integrity and excellence guide us in helping you achieve a prosperous future. .`} icon={faCity} />
<Contact/>
        </Col>
        </Row>
<MiniFooter/>

    </div>
}
export default AboutUs