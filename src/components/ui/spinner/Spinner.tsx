import React, {FC} from 'react';

import loading from './Load.svg';

import './Spinner.scss'

const Spinner: FC = () => {

  return (
    <img src={loading} alt="Loading..." className="spinner"/>
  )
    
}

export default Spinner;