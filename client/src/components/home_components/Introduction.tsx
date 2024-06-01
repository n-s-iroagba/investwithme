import React from 'react'
import '../styles.css'
import { whoWeAre, howWeDoIt } from '../../utils/constants'
const Introduction: React.FC = () => {
    return<>
        <div className='px-4'>
            <div className='d-flex flex-column align-items-center pb-2'>
                <h4>Who we are?</h4>
                <div className='primary-line mb-2'></div>
                <p className='text-center'>{whoWeAre}</p>
            </div>
            <div className='d-flex flex-column align-items-center pb-2'>
                <h4>How we do it.</h4>
                <div className='primary-line mb-2'></div>
                <p className='text-center'>{howWeDoIt}</p>
            </div>
        </div>
        </>
}
        export default Introduction