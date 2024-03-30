import React from 'react'
import '../../assets/Styles.css'
import { whoWeAre, howWeDoIt } from '../../helpers/data'
const Introduction: React.FC = () => {
    return<>
        <div className='px-4'>
            <div className='d-flex flex-column align-items-center pb-2'>
                <h4>Who we are?</h4>
                <div className='primary-line mb-2'></div>
                <p>{whoWeAre}</p>
            </div>
            <div className='d-flex flex-column align-items-center pb-2'>
                <h4>How we do it.</h4>
                <div className='primary-line mb-2'></div>
                <p className=''>{howWeDoIt}</p>
            </div>
        </div>
        </>
}
        export default Introduction