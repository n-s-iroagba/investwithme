import React from 'react'
import Line from './Line'
import'../assets/Styles.css'
const Introduction:React.FC= ()=>{
    return<div className='intro-wrapper'>
        <div className='main-intro'>
        <div className='space-down'>
 <h4>Who we are?</h4><Line/> 
        </div>
            <p className='main-intro-writeup' > is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div> 
        <div className='main-intro'>
            <div className='space-down'>
           <h4>How we do it</h4><Line/> 
            </div>
            <p className='main-intro-writeup'>We are cassock equityfallllll lllllll lllllllllll llllllllllll lllllllll lllllllll llllll lllllllll llllllllll lllllllllllllll llllllllllllllllllllllllll</p>
        </div> 
    </div>
}
export default Introduction