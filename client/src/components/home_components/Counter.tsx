import React from "react";
import { useState,useEffect,useRef } from "react";
import { Row,Col } from "react-bootstrap";
import '../../assets/Styles.css'

const Counter:React.FC = ()=>{
const [clientCount, setClientCount] = useState(0);
const [assetCount, setAssetCount] = useState(0);
const [isComponentVisible, setIsComponentVisible] = useState(false);
const componentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsComponentVisible(true);
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Change this threshold as needed
    }
  );

  if (componentRef.current) {
    observer.observe(componentRef.current);
  }

  return () => {
    if (componentRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(componentRef.current);
    }
  };
}, []);

useEffect(() => {
  let clientIntervalId: NodeJS.Timeout;
  let assetIntervalId: NodeJS.Timeout;

  if (isComponentVisible) {
    clientIntervalId = setInterval(() => {
      setClientCount(prevCounter => (prevCounter < 600000 ? prevCounter + 2000 : prevCounter));
    }, 0.5);

    assetIntervalId = setInterval(() => {
      setAssetCount(prevCounter => (prevCounter < 300000000 ? prevCounter + 1000000 : prevCounter));
    }, 0.5);
  }

  return () => {
    clearInterval(clientIntervalId);
    clearInterval(assetIntervalId);
  };
}, [isComponentVisible]);


    return<div ref={componentRef} className="mb-4">
      <Row className='background-secondary'>
        <Col className='element py-4' sm={12} lg={6}>
          <h2 className='text-center heavy-font'> {clientCount}+</h2><h3 className='text-center'>investors worldwide</h3>
        </Col>
        <Col  className='py-4 'sm={12} lg={6}>
          <h2 className='text-center heavy-font'>${assetCount}+</h2><h3 className='text-center'> under management</h3>
        </Col>
      </Row>
    </div>
}
export default Counter