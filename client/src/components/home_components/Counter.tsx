import React from "react";
import { useState,useEffect,useRef } from "react";
import { Row,Col } from "react-bootstrap";
import '../styles.css'
import { numberWithCommas } from "../../utils/utils";

const Counter:React.FC = ()=>{
const [clientCount, setClientCount] = useState<any>(0);
const [assetCount, setAssetCount] = useState<any>(0);
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
      setClientCount((prevCounter:number) => (prevCounter < 60000 ? prevCounter + 2000 : prevCounter));
    }, 100);

    assetIntervalId = setInterval(() => {
      setAssetCount((prevCounter:number) => (prevCounter < 300000000 ? prevCounter + 1000000 : prevCounter));
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
          <h2 className='text-center heavy-font'> {clientCount< 60000 ? clientCount : numberWithCommas(clientCount)}+</h2><h3 className='text-center'>investors worldwide</h3>
        </Col>
        <Col  className='py-4 'sm={12} lg={6}>
          <h2 className='text-center heavy-font'>${assetCount < 300000000 ? assetCount : numberWithCommas(assetCount)}+</h2><h3 className='text-center'> under management</h3>
        </Col>
      </Row>
    </div>
}
export default Counter