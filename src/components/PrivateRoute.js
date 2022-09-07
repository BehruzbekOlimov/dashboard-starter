import { Navigate } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute({ children, user }) {

  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/sign-in"/>
  }

  // authorized so return child components
  return children;
}
