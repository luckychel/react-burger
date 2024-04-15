import React, { useEffect } from 'react';
import AppHeader from '../app-header/AppHeader'

import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients } from '../../services/actions';
import { useDispatch } from 'react-redux';

import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../../pages/main'
import Login from '../../pages/login'
import NotFound404 from '../../pages/not-found'
import Profile from '../profile/Profile'
import ProfileMenu from '../profile/ProfileMenu';
import OrdersHistory from '../orders-history/OrdersHistory';
import Order from '../order/Order';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();

  return (
    <ErrorBoundary>
        <AppHeader />
        <Routes location={location.state?.background || location}>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound404/>}/>

            <Route path="/profile" element={<ProfileMenu />}>
              <Route index element={<Profile />} />
              <Route path="" element={<Profile />} />
              <Route path="orders" element={<OrdersHistory />} />
              <Route path="orders/:number" element={<Order />} />
            </Route>
          </Routes>
    </ErrorBoundary>
  );
}

export default App;
