import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './ErrorBoundary.scss'

class ErrorBoundary extends Component{
    state={
        error: false,
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error: true
        })
    }
        
    render(){
        if (this.state.error) {
            return(
                <div className="boundary_error">
                    <h2>On site are conducted technical works</h2>    
                    <ErrorMessage/>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary