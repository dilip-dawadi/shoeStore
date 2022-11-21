import React from 'react';
// import components
import Product from './Product';
import { LoadingCard } from '../toastify';
const ProductList = ({ data, runningData, error, loungingData, everydayData, loading, title, category, style }) => {
  const gridColLounging = loungingData?.length === 1 ? 1 : loungingData?.length === 2 ? 2 : loungingData?.length === 3 ? 3 : 4;
  const gridColRunning = runningData?.length === 1 ? 1 : runningData?.length === 2 ? 2 : runningData?.length === 3 ? 3 : 4;
  const gridColEveryday = everydayData?.length === 1 ? 1 : everydayData?.length === 2 ? 2 : everydayData?.length === 3 ? 3 : 4;
  const gridCol = data?.length === 1 ? 1 : data?.length === 2 ? 2 : data?.length === 3 ? 3 : 4;
  if (error === true) {
    return (
      <div className='text-center text-3xl text-gray-400 my-48'>
        {title === 'WishList' ? 'No items in your wishlist!' : 'No Shoes Found!'}
      </div>
    );
  }
  return (
    <section className='mb-20 mt-10'>
      <div className='container mx-auto'>
        <div
          className='text-center text-[1.75rem] font-bold text-black mb-2' style={style}
        >{title} {category && `for ${category}`}</div>
        <div className='text-center text-gray-700 mb-7 mt-3 mx-auto text-md font-[400] max-w-2xl italic' style={style}>
          Fluffy sneakers. Cushy slippers. Ridiculously fluffy pants. Home or away, we’ve got what he needs to chill the most.</div>
        {loading ? <LoadingCard /> :
          <div className={data?.length >= 4 ? `grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8` : `grid md:grid-cols-${data?.length === 1 ? 1 : 2} lg:grid-cols-${gridCol} gap-4 lg:gap-8`}>
            {data?.slice()?.reverse()?.map((Products, index) => {
              return (
                <Product Products={Products} key={index} />
              );
            }).slice(0, 4)}
          </div>
        }
        {loungingData &&
          loungingData?.length !== 0 &&
          <>
            <div className='w-full h-[1px] bg-[#957272] mt-12 mb-10'></div>
            <div
              className='text-center text-[1.75rem] font-bold text-black mb-2' style={style}
            >Lounging Shoe {category && `for ${category}`} </div>
            <div className='text-center text-gray-700 mb-7 mt-3 mx-auto text-md font-[400] max-w-2xl italic' style={style}>
              Fluffy sneakers. Cushy slippers. Ridiculously fluffy pants. Home or away, we’ve got what he needs to chill the most.</div>
            <div className={loungingData?.length >= 4 ? `grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8` : `grid md:grid-cols-${loungingData?.length === 1 ? 1 : 2} lg:grid-cols-${gridColLounging} gap-4 lg:gap-8`}>
              {loungingData?.slice()?.reverse()?.map((Products, index) => {
                return (
                  <Product Products={Products} key={index} />
                );
              }).slice(0, 4)}
            </div>
          </>
        }
        {everydayData &&
          everydayData?.length !== 0 &&
          <>
            <div className='w-full h-[1px] bg-[#957272] mt-12 mb-10'></div>
            <div
              className='text-center text-[1.75rem] font-bold text-black my-2' style={style}
            >Everyday Shoe {category && `for ${category}`}</div>
            <div className='text-center text-gray-700 mb-7 mt-3 mx-auto text-md font-[400] max-w-2xl italic' style={style}>
              Fluffy sneakers. Cushy slippers. Ridiculously fluffy pants. Home or away, we’ve got what he needs to chill the most.</div>
            <div className={everydayData?.length >= 4 ? `grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8` : `grid md:grid-cols-${everydayData?.length === 1 ? 1 : 2} lg:grid-cols-${gridColEveryday} gap-4 lg:gap-8`}>
              {everydayData?.slice()?.reverse()?.map((Products, index) => {
                return (
                  <Product Products={Products} key={index} />
                );
              }).slice(0, 4)}
            </div>
          </>
        }
        {runningData &&
          runningData?.length !== 0 &&
          <>
            <div className='w-full h-[1px] bg-[#957272] mt-12 mb-10'></div>
            <div
              className='text-center text-[1.75rem] font-bold text-black mb-2' style={style}
            >Running Shoe {category && `for ${category}`}</div>
            <div className='text-center text-gray-700 mb-7 mt-3 mx-auto text-md font-[400] max-w-2xl italic' style={style}>
              Fluffy sneakers. Cushy slippers. Ridiculously fluffy pants. Home or away, we’ve got what he needs to chill the most.</div>
            <div className={runningData?.length >= 4 ? `grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8` : `grid md:grid-cols-${runningData?.length === 1 ? 1 : 2} lg:grid-cols-${gridColRunning} gap-4 lg:gap-8`}>
              {runningData?.slice()?.reverse()?.map((Products, index) => {
                return (
                  <Product Products={Products} key={index} />
                );
              }).slice(0, 4)}
            </div>
          </>
        }
      </div>
    </section >
  );
};

export default ProductList;
