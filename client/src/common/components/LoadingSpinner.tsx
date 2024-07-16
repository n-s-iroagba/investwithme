import React from "react";
import { Spinner } from "react-bootstrap";


const LoadingSpinner:React.FC<{primaryBackground?:boolean}> = ({primaryBackground}) =>{
    const color = primaryBackground?'text-light':''
    const spinnerColor = primaryBackground?'light':'success'
    return <div className="w-100 full-height d-flex justify-content-center flex-column align-items-center">
        <Spinner variant={spinnerColor}/>
        <p className={color}>Loading...</p>
    </div>
}
export default LoadingSpinner