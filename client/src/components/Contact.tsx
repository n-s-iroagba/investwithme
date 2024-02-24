import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from "react-bootstrap";
import { ContactButton, SocialMediaButton } from "./Button";

const Contact = () => {
    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <h2>We'll Be Happy To Hear From You.</h2>
                <div className="primary-line mb-3"></div>
            </div>
            <p className="text-center mb-4">Let's talk! We're happy to answer any questions you have.</p>
            <Row className="mb-4">
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center mb-3">
                        < div ><FontAwesomeIcon icon={faEnvelope} className="my-2 primary-color icon-size" /></div>
                        <div className="text-start">
                            <p>cassock**t@gmail.com</p>
                            <p>Monday - Fridays</p>
                            <div className="button-width-narrower"><ContactButton /></div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center pt-2">
                        < div ><SocialMediaButton /></div>
                        <div className="text-start">
                            <p>Click the icon above to follow us on social media</p>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center pt-2">
                        < div ><FontAwesomeIcon icon={faMapMarkerAlt} className="my-2 primary-color icon-size" /></div>
                        <div className="text-start">
                            <p>No.7 your father's village</p>
                            <p>Monday - Fridays</p>
                            <p>UTC Timezone</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Contact