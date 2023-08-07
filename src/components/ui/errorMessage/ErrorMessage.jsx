import error from './error.gif'

import './ErrorMEssage.scss'

const ErrorMessage = () => {
    
    return (
        <>
            <img src={error} alt="Error 404" className='error'/>  
        </>
    )
    
}

export default ErrorMessage;