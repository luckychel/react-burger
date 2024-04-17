import React, { useEffect } from 'react';
import AppHeader from '../app-header/AppHeader'

import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients, checkUserAuth } from '../../services/actions';
import { useDispatch } from 'react-redux';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Main from '../../pages/main'
import NotFound404 from '../../pages/not-found'

import Profile from '../profile/Profile'
import ProfileMenu from '../profile/ProfileMenu';
import OrdersHistory from '../orders-history/OrdersHistory';
import Order from '../order/Order';
import OrderFeed from '../order-feed/OrderFeed';
import Login from '../../pages/login'
import ForgotPassword from '../../pages/forgot-password';
import Register from '../../pages/register';
import ResetPassword from '../../pages/reset-password';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';

import { OnlyAuth, OnlyUnAuth } from '../protected-route/ProtectedRoute';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };



  return (
    <ErrorBoundary>
        <AppHeader />
        <Routes location={background || location}>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound404/>}/>

            <Route path="/orderfeed" element={<OrderFeed/>}/>

            <Route path="/profile" element={<OnlyAuth element={<ProfileMenu />} />}>
              <Route index element={<Profile />} />
              <Route path="" element={<Profile />} />
              <Route path="orders" element={<OrdersHistory />} />
              <Route path="orders/:number" element={<Order />} />
            </Route>

            <Route path="/login" element={<OnlyUnAuth element={<Login />} />} />
            <Route path="/register" element={<OnlyUnAuth element={<Register />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPassword />} />} />

            <Route path='/ingredients/:ingredientId' element={<IngredientDetails header="Детали ингредиента" />} />
          </Routes>

          {background && (
            <Routes>
                <Route
                  path='/ingredients/:ingredientId'
                  element={
                    <Modal onClose={handleModalClose} header="Детали ингредиента">
                      <IngredientDetails />
                    </Modal>
                  }
                />
            </Routes>
          )}
    </ErrorBoundary>
  );
}

export default App;
