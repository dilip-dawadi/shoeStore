import React from 'react';

// import components
import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import TopProduct from './topProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShoe } from '../statemanagement/slice/ShoeSlice';
import Search from '../components/filterProduct/Search';
const Home = () => {
  const dispatch = useDispatch();
  const { shoeData, loading, error } = useSelector((state) => state.shoeDetails);
  const { page, limit, sort, brand, category, price } = useSelector((state) => state.filterShoes);
  React.useEffect(() => {
    dispatch(getAllShoe({ page, limit, sort, brand, category, price }));
  }, [dispatch, page, limit, sort, brand, category, price]);
  return (
    <div className='min-h-[1400px]'>
      <Banner />
      <Search brandValue={brand} categoryValue={category} priceValue={price} pageValue={page} loading={loading} />
      <ProductList data={shoeData} error={error} loading={loading} title='Our Products' />
      <TopProduct />
    </div>
  );
};

export default Home;
