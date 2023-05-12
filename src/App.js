import React from 'react';
import { decodeToken } from 'react-jwt';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { Header } from './components/Header';
import PageNotFound from './components/pageNotFound';

// import pages
import Home from './pages/Home';
import Products from './pages/AllProduct';
import Wishlist from './pages/wishlist';
import ProductDetails from './pages/ProductDetails';
import UserVerification from './pages/UserEmailVerification';
import { NotifyInfo } from './toastify';
import { useLocation } from 'react-router-dom';
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('authenticate');
  React.useEffect(() => {
    if (!token) {
      navigate(location.pathname);
    } else {
      const decodeData = decodeToken(token);
      const hoursLeft = (decodeData.exp * 1000 - new Date().getTime()) / 1000 / 60 / 60;
      if (hoursLeft < 0) {
        localStorage.removeItem('authenticate');
        NotifyInfo('Your session has expired. Please login again');
        navigate('/');
      }
      if (hoursLeft < 24) {
        NotifyInfo('Your session will expire in ' + hoursLeft + ' hours');
      }
    }
  }, [token, navigate]);
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/user/:userId/verify/:verifyId' element={<UserVerification />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
