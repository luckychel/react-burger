import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { PreLoader } from '../pre-loader/PreLoader';
import { useAppSelector } from '../../services/hooks';

interface IProtectedProps {
  element: ReactElement;
}

const ProtectedRoute: FC<{ onlyUnAuth?: boolean } & IProtectedProps> = ({ onlyUnAuth = false, element }) => {

  const { user, isAuthChecked } = useAppSelector(store => store.user);
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


export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth: FC<IProtectedProps> = ({element}) => <ProtectedRoute onlyUnAuth={true} element={element} />