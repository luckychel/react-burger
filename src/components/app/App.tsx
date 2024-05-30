import { useEffect, FC } from 'react';
import AppHeader from '../app-header/AppHeader'

import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients, checkUserAuth } from '../../services/actions';
import { useAppDispatch } from '../../services/hooks';

import { Routes, Route, useLocation, useNavigate, useMatch } from 'react-router-dom';
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

const App: FC = () => {

  const dispatch = useAppDispatch();

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
  
  const matchFeed = useMatch('/feed/:number');
  const matchOrder = useMatch('/profile/orders/:number');

  return (
    <ErrorBoundary>
        <AppHeader />
        <Routes location={background || location}>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound404/>}/>

            <Route path="/feed" element={<OrderFeed/>}/>
            <Route path="/feed/:number" element={<Order />} />

            <Route path="/profile" element={<OnlyAuth element={<ProfileMenu />} />}>
              <Route index element={<Profile />} />
              <Route path="" element={<Profile />} />
              <Route path="orders" element={<OrdersHistory />} />
            </Route>

            <Route path="/profile/orders/:number" element={<OnlyAuth element={<Order/>} />} />

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

                <Route path='/feed/:number' element={
                   <Modal onClose={handleModalClose} header={'# ' + matchFeed?.params.number}>
                      <Order />
                   </Modal>
                }
                />

                <Route path='/profile/orders/:number' element={
                  <Modal onClose={handleModalClose} header={'# ' + matchOrder?.params.number}>
                    <Order />
                  </Modal>
               }
              />
            </Routes>
          )}
    </ErrorBoundary>
  );
}

export default App;