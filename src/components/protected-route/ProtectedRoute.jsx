import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PreLoader } from '../pre-loader/PreLoader';

const ProtectedRoute = ({ onlyUnAuth = false, element }) => {

  const { user, isAuthChecked } = useSelector(store => store.user);
  const location = useLocation()

  if (!isAuthChecked) {
    return <PreLoader />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' state={{ from: location }} />;

  return element;
}

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool,
    element: PropTypes.element,
  }
  
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({element}) => <ProtectedRoute onlyUnAuth={true} element={element} />