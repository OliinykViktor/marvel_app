import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <h1>{error.status} {error.statusText}</h1>
      <h4>{error.error.message}</h4>
      <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
      <Link to={'/'} >Go to homepage</Link>
    </>
    );
}

export default ErrorPage;