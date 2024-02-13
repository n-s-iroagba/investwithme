import React, { useState } from 'react';
import { Card, Carousel, Image,Col,Row } from 'react-bootstrap';
import home0 from '../assets/home0.gif'
import home1 from '../assets/home1.webp';
import '../assets/Styles.css'
import Line from './Line';

interface TheTestimonial {
  name: string;
  testimony: string;
  rating: number;
  image: any;
}

interface TestimonialProps {
  testimonials: TheTestimonial[];
}

const TestimonialCarousel: React.FC<TestimonialProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel variant='dark' style={{width:'80%',height:'9cm',marginTop:'0.5cm'}} activeIndex={index} onSelect={handleSelect} indicators={false}>
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
<Card className="text-center">
  <Card.Body>
    <Card.Title>*****</Card.Title>
    <Card.Text>{testimonial.testimony}</Card.Text>
  </Card.Body>
  <Card.Footer className="text-muted">
    <Row className="align-items-center justify-content-center">
      <Col xs={12} className="mb-2 text-center"> {/* Center the image horizontally */}
        <Image style={{ width: '2cm', margin: 'auto' }} src={testimonial.image} alt="Card Image" roundedCircle />
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
  );
};




const Testimonial: React.FC = () => {
  const data = [   {
    name: 'John Doe',
    testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    image: home1,
  },
  {
    name: 'Jane Smith',
    testimony: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    rating: 4,
    image: home0,
  },];
  return (<>
 
    <div  className='d-flex flex-column justify-content-center align-items-center'style={{paddingTop:'0.5cm',width:'100vw',height:'10cm'}}>
     
    <h1 >testimonials</h1><Line/>
      <TestimonialCarousel testimonials={data} />
  
    </div>
    </>);
};

export default Testimonial;



