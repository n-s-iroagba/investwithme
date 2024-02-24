import React from "react";

const OfficeMap: React.FC = () => {

      return (
          <div className='d-flex justify-content-center px-4'>
              <iframe
                  title="Google Map"
                  style={{ width: '100%', height: '6cm' }}
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />
          </div>
      );
  };
  
  
export default OfficeMap;