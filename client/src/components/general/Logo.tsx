import React from 'react'

const Logo:React.FC<{logoImage:any}> = ({logoImage}) =>{
    return(
        <div className="logo">
            <img src={logoImage} alt="logo" />
        </div>
    )
}
export default Logo