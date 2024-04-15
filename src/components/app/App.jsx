import React, { useEffect } from 'react';
import styles from './App.module.css';


import AppHeader from '../app-header/AppHeader'

import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients } from '../../services/actions';
import { useDispatch } from 'react-redux';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Main from '../../pages/main'
import Login from '../../pages/login'
import NotFound404 from '../../pages/not-found'

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
          </Routes>
    </ErrorBoundary>
  );
}

export default App;
