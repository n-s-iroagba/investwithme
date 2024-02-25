import React from 'react'


const ErrorMessage:React.FC<{message:string}> = (message)=> {

return<>
{
    message.message===''?'': <p className='text-danger'>{message.message}</p>
}
</>

}
export default ErrorMessage