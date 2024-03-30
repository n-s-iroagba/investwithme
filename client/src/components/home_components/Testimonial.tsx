import React, { useState } from 'react';
import { Card, Carousel, Image, Col, Row } from 'react-bootstrap';
import '../../assets/Styles.css'
import testimonials from '../../helpers/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface TheTestimonial {
  name: string;
  testimonial: string;
}
interface TestimonialProps {
  testimonials: TheTestimonial[];
}

const images = ['','']

const TestimonialCarousel: React.FC<TestimonialProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon key={index} className='primary-color' icon={faStar} />
  ));

  return (
    <div className='carousel-wrapper px-4'>
      <Carousel  variant='dark' activeIndex={index} onSelect={handleSelect} indicators={false}>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Card className="testimonial text-center">
              <Card.Body>
                <Card.Title>{stars}</Card.Title>
                <Card.Text>{testimonial.testimonial}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row className="align-items-center justify-content-center">
                  <Col xs={12} className="mb-2 text-center"> {/* Center the image horizontally */}
                    <Image className='rounded-image-size' src={images[index]} alt="Card Image" roundedCircle />
                  </Col>
                  <Col xs={12}>
                    <Card.Text>- {testimonial.name}</Card.Text>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>


          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};




const Testimonial: React.FC = () => {
  return (<>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h4 >What our clients say</h4>
      <div className='primary-line mb-4'></div>
    </div>
    <TestimonialCarousel testimonials={testimonials} />
  </>);
};

export default Testimonial;



