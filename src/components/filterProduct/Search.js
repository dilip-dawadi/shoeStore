import React from 'react';

// import components
import BrandDropdown from './BrandDropdown';
import ProductDropdown from './ProductDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';

// import icon
import { RiSearch2Line } from 'react-icons/ri';

const Search = () => {
  const handleClick = () => {
    console.log('search');
  };
  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      <BrandDropdown />
      <ProductDropdown />
      <PriceRangeDropdown />
      <button
        onClick={() => {
          handleClick();
        }}
        className='bg-[#FE3E69] hover:bg-[#fe2856] transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
