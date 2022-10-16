import React from 'react';

// import components
import BrandDropdown from './BrandDropdown';
import ProductDropdown from './ProductDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';

// import icon
import { RiSearch2Line } from 'react-icons/ri';
import AddProduct from '../Model/addProduct';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col items-center lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      {!token ?
        <>
          <BrandDropdown />
          <ProductDropdown />
          <PriceRangeDropdown />
          <button
            className='bg-[#FE3E69] hover:bg-[#fe2856] transition w-full py-4 lg:max-w-[162px] rounded-lg flex justify-center items-center text-white text-lg'
          >
            <RiSearch2Line />
          </button>
        </>
        :
        <>
          <h3 className='text-2xl font-semibold text-center lg:text-left text-[#FE3E69]'>
            {userData?.role === 1 ? 'Admin' : 'User'}
          </h3>
          <h3 className='text-2xl font-semibold text-center lg:text-left text-[#FE3E69] '>
            Welcome back, {userData?.userName}
          </h3>
          <button
            className='bg-[#FE3E69] hover:bg-[#fe2856] transition px-4 py-3 lg:max-w-[162px] rounded-lg flex justify-center items-center text-white text-lg'
          >
            <AddProduct />
          </button>
        </>
      }
    </div>
  );
};

export default Search;
