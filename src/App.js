import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import { Header } from './components/Header';
import PageNotFound from './components/pageNotFound';

// import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import UserVerification from './pages/UserEmailVerification';

const App = () => {
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/user/:userId/verify/:verifyId' element={<UserVerification />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
