import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Col, Row } from 'react-bootstrap'


export const LoginOption: React.FC<{
    route: string;
    title: string;
    buttonText: string;
    icon?: IconProp;
    dontShowLogo?: boolean;
  }> = ({ route, title, buttonText, icon, dontShowLogo }) => {
    const navigate = useNavigate();
  
    return (
      <>
        <Row className='d-flex mb-3 justify-content-evenly mt-3 align-items-center'>
          {!dontShowLogo && (
            <Col className='d-flex justify-content-center align-items-center' xs={3} md={6}>
              Logo
            </Col>
          )}
          <Col>
            <div className={dontShowLogo?'w-100 d-flex mb-3 justify-content-evenly mt-3 align-items-center':'w-100 mb-3 d-flex align-items-end flex-column justify-content-between'}>
              <p className='mt-3'>{title}</p>
              <div >
                <button onClick={() => navigate(`/${route}`)} className='button-styles button-width-narrower'>
                  {icon && <FontAwesomeIcon icon={icon} className='mr-2' />} {/* Added className for Font Awesome icon */}
                  {buttonText}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };