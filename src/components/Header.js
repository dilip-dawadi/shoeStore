import React from 'react';

// import link
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='py-4 mb-0 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className="
        text-3xl font-bold text-rose-500 first-letter:uppercase 
        hover:text-rose-700 transition duration-300 ease-in-out">
          shoe Store
        </Link>
        <div className='flex items-center gap-6'>
          <Link className='hover:text-[#ff2f5c] transition' to='/'>
            Log in
          </Link>
          <Link
            className='bg-[#FE3E69] hover:bg-[#ff2f5c] text-white px-4 py-3 rounded-lg transition'
            to='/'
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
