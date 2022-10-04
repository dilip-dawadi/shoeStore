import React, { useEffect } from 'react';
//  useParams
import { useParams } from 'react-router-dom';
// import link
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  console.log(data);
  useEffect(() => {
    function getShoesById() {
      const myHeaders = new Headers({
        'Content-Type': 'application/json',
      });

      return fetch(`${process.env.REACT_APP_BASE_URL}shoesPage/${id}`, {
        method: 'GET',
        headers: myHeaders,
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        })
        .then(response => {
          setData(response.foodById);
        }).catch(error => {
          console.error(error);
        });
    }
    getShoesById();
  }, [id]);

  return (
    <div className='container mx-auto min-h-[800px] my-4'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>{data?.title}</h2>
          <h3 className='text-lg mb-4'>{data?.description?.slice(0, 87)}...</h3>
        </div>
        <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
          <div>
            {data?.tags?.map((tag, index) => {
              return (
                <span className='capitalize bg-green-500 rounded-full text-white px-2 py-1 ml-1 inline-block' key={index}>
                  {tag}</span>
              );
            }
            ).splice(0, 1)}
          </div>
          <div className='bg-rose-500 rounded-full text-white px-2 py-1 ml-1 inline-block'>
            Available: {data?.quantity}
          </div>
        </div>
        <div className='text-3xl font-semibold text-rose-600'>
          $ {data?.price}
        </div>
      </div>
      <div className='flex flex-col items-start gap-8 lg:flex-row'>
        <div className='max-w-[768px]'>
          <img className='mb-8 rounded-lg lg:min-w-[720px] lg:max-w-[720px] lg:min-h-[520px] lg:max-h-[520px] object-cover bg-white' src={data?.selectedFile} alt='' />
          <p>{data?.description}</p>
        </div>
        <div className='flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8'>
          <div className='flex items-center gap-x-4 mb-8'>
            <div className='w-10 h-10 p-1 border border-gray-300 rounded-full'>
              <img src={data?.selectedFile} alt='' />
            </div>
            <div>
              <div className='font-bold text-lg'>
                {data?.title}
              </div>
              <Link to='' className='text-rose-700 text-sm'>
                Order Now
              </Link>
            </div>
          </div>
          <form className='flex flex-col gap-y-4'>
            <input
              className='border border-gray-300 focus:border-rose-700 rounded w-full px-4 h-14 text-sm outline-none'
              type='text'
              placeholder='Name*'
            />
            <input
              className='border border-gray-300 focus:border-rose-700 rounded w-full px-4 h-14 text-sm outline-none'
              type='text'
              placeholder='Email*'
            />
            <input
              className='border border-gray-300 focus:border-rose-700 rounded w-full px-4 h-14 text-sm outline-none'
              type='text'
              placeholder='Phone*'
            />
            <textarea
              className='border border-gray-300 focus:border-rose-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
              type='text'
              placeholder='Message*'
              defaultValue='Hello, I am interested to buy this product. Please contact me.'
            />
            <div className='flex gap-x-2'>
              <button
                className='bg-rose-700 hover:bg-rose-800 text-white rounded p-4 text-sm w-full transition'
                type='submit'
              >
                Send message
              </button>
              <button className='border border-rose-700 text-rose-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition'>
                Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
