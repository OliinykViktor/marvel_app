import { Component } from 'react';

import error from './error.gif'

class ErrorMessage extends Component {
    render(){
        return (
            <>
              <img src={error} alt="Error 404" />  
            </>
        )
    }
}

export default ErrorMessage;