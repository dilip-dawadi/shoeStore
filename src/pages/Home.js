import React from 'react';

// import components
import HouseList from '../components/ProductList';
import Banner from '../components/Banner';
import TopProduct from './topProduct';
const Home = () => {
  return (
    <div className='min-h-[1400px]'>
      <Banner />
      <HouseList />
      <TopProduct />
    </div>
  );
};

export default Home;
