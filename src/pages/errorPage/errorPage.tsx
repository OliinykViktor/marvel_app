import {FC} from 'react';

import { Link, useRouteError } from "react-router-dom";

import './errorPage.scss'

const ErrorPage: FC = () => {
  const error = useRouteError();
  
  return (
    <>
      <h1 className="error__title">{error.status} {error.statusText}</h1>
      <h4 className="error__subtitle">{error.error.message}</h4>
      <p className="error__descr">Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
      <Link className="error__link" to={'/'} >Go to homepage</Link>
    </>
    );
}

export default ErrorPage;