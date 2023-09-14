import React, { FC } from 'react';

import errorImg from './error.gif';

import './ErrorMEssage.scss'

const ErrorMessage: FC = () => {

    return (
            <img src={errorImg} alt="Error 404" className='errorMsg__img' />
    )

}

export default ErrorMessage;