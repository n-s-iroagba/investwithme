import React, { useEffect, useState } from 'react';
import { getPromoRemainingTime } from '../../utils/utils';
import { GetStartedButton } from '../general/Button';
import { PromoType } from '../../utils/types';

const Promo: React.FC<{promo?:PromoType}>= ({promo}) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if(promo){
    const remainingHours: number | null = getPromoRemainingTime(promo.startDate,promo.endDate);
    console.log(remainingHours)
    if (typeof remainingHours === 'number') {
      setCountdown(remainingHours);

      const timer = setInterval(() => {
        setCountdown((prevCountdown:any) => (prevCountdown) - 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }
  }, [promo, setCountdown]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time /86400000);
    let pluralDays = days>1? 'days': 'day'
    const hoursInMilliSecs = time - (86400000*days)
    const hours = Math.floor(hoursInMilliSecs / 3600000);
    let pluralHours = hours>1? 'hours': 'hour'
    const minutesInMilliSecs = hoursInMilliSecs - (hours* 3600000)
    const minutes = Math.floor(minutesInMilliSecs / 60000);
    const secondsinMilliSecs = minutesInMilliSecs - (minutes*60000);
    const seconds = Math.floor(secondsinMilliSecs/1000)

    return `${days.toString()} ${pluralDays}: ${hours.toString()} ${pluralHours}: ${minutes.toString()} minutes : ${seconds.toString()} seconds`
  };


  return (
    <div>
    {promo && (
      <div className='px-4'>
        {typeof countdown === 'number' ? (
          <div className='text-center'>
            <div className='d-flex flex-column align-items-center'>
              <h2>Promotional Offer</h2>
              <div className='primary-line mb-2'></div>
            </div>
            <div className='text-light primary-background py-3'>
              <h5 >We are pleased to announce a promotional offer!</h5>
              <h5 className='mb-4'>{` Investing before the timer expires results in a ${promo.bonusPercent}% boost in your return on investment.`}</h5>
              <h6>{formatTime(countdown)}</h6>
              <p>Time remaining until offer close.</p>
              <div className='d-flex justify-content-center'>
                <div className='button-width-narrower'>
                  <GetStartedButton />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    )}
  </div>
  );
};

export default Promo;

