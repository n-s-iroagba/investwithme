import React from "react";



const TopInformation:React.FC<{head:string,information:string}>= (props)=>{
    return(<div>
        <h4>{props.head}</h4>
        <p>{props.information}</p>
    </div>)
}
export default TopInformation