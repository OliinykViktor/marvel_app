import { Component } from "react";

import loading from './Load.svg';

import './Spinner.scss'

class Spinner extends Component {
    render(){
        return (
          <img src={loading} alt="Loading..." className="spinner"/>
        )
    }
}

export default Spinner;