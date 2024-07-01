import React from 'react';
import { Row, Col,Card } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';

// Define types for the step
type Step = {
  title: string;
  description: string;
  icon: string;
};

// Steps data
const steps: Step[] = [
  {
    title: 'Step 1: Create an Account',
    description: 'Sign up by providing your personal information and verifying your email address.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
  {
    title: 'Step 2: Set Up Your Profile',
    description: 'Complete your profile by adding financial details and investment preferences.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
  {
    title: 'Step 3: Link Your Bank Account',
    description: 'Securely link your bank account to enable deposits and withdrawals.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
  {
    title: 'Step 4: Choose Your Investment Strategy',
    description: 'Select an investment strategy that aligns with your financial goals and risk tolerance.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
  {
    title: 'Step 5: Build Your Portfolio',
    description: 'Add assets to your portfolio by purchasing stocks, bonds, or other investment products.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
  {
    title: 'Step 6: Monitor and Adjust',
    description: 'Regularly monitor your portfolio and make adjustments as needed to stay on track with your goals.',
    icon: 'https://via.placeholder.com/50', // Replace with actual icon URL
  },
];

// HowToGuides component
const HowToGuides: React.FC = () => {
  return (
    <div className='primary-background text-light'>
    <div className='full-height'>
      <h2 className="text-center mb-4">How to Create a Portfolio</h2>
      <Row  className="gx-2 gy-2 d-flex justify-content-center">
      {steps.map((step, index) => (
        
          <Col   key={index} xs={10} md={6} lg={4}>
            <Card className='w-100' style={{height:'4cm'}}>
              <Card.Body>
                <Card.Title>{step.title}</Card.Title>
                <Card.Text>{step.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        
      ))}
      </Row>
      </div>
      <MiniFooter primaryVariant/>
    </div>
  );
};

export default HowToGuides;
