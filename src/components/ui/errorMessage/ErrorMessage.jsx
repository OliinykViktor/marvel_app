import { Link } from 'react-router-dom'
import errorImg from './error.gif'

import './ErrorMEssage.scss'

const ErrorMessage = () => {
    
    return (
        <div className='errorMsg'>
            <h2 className='errorMsg__title'>OOpps!</h2>
            <p className='errorMsg__subtitle'>We cannot find the page you want</p>
            <img src={errorImg} alt="Error 404" className='errorMsg__img'/>
        </div>
    )
    
}

export default ErrorMessage;