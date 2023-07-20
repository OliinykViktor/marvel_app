import { Component } from 'react';

import error from './error.gif'

import './ErrorMEssage.scss'

class ErrorMessage extends Component {
    render(){
        return (
            <>
              <img src={error} alt="Error 404" className='error'/>  
            </>
        )
    }
}

export default ErrorMessage;