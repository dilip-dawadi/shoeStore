import React from 'react';
import Image from '../assets/homepage.svg';
import Search from '../components/filterProduct/Search';

const Banner = () => {
  return (
    <div className='h-full max-h-[700px] pt-0 pb-0 xl:mb-16'>
      <section style={{
        // filter: 'blur(1px)',
      }}>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:ml-8 xl:ml-[165px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
            <h1 className='text-4xl lg:text-[66px] font-medium leading-none mb-6'>
              <span className='text-[#FE3E69]
              italic font-semibold
              '>Shoe Store,</span> Your dream footwear store.
            </h1>
            <p className='max-w-[500px] mb-8 font-normal text-xl'>
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <button className='bg-[#FE3E69] hover:bg-[#fe2856] text-white px-4 py-3 rounded-lg transition'>
              Get Started
            </button>
          </div>
          <div className='relative flex-1 hidden lg:flex justify-end items-end pb-3' style={{
            minHeight: "620px",
          }}>
            <div style={{
              position: 'absolute',
              top: "2%",
              left: "50%",
              transform: "translate(-50%, -2%)",
              width: "460px",
              height: "460px",
              borderRadius: "50%",
              backgroundImage: "linear-gradient(360deg, #db506e 0%, #fe3e69 75%)",
              opacity: "0.90",
              filter: "blur(2px)",
            }}
              className='shadow-2xl'
            >

            </div>
            <img style={{
              position: 'absolute',
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              zIndex: 2,
            }} className='overflow-hidden rounded-full transition' width={520} src={Image} alt='' />
          </div>
        </div>
      </section>
      <Search />
    </div>
  );
};

export default Banner;
