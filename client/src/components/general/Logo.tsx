import React from 'react'
import '../../components/styles.css'
const Logo:React.FC<{logoImage:any}> = ({logoImage}) =>{
    return(
        <div>
          <img className='logo' src={logoImage} alt='Cassock'/>
        </div>
    )
}
export default Logo 

