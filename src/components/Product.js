import React from 'react';
// import icons
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Product = ({ Products, key }) => {
  const [hoverOn, setHoverOn] = React.useState(false);
  return (
    <div className='shadow-1 p-3 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition relative' key={key}>
      <center><img className='mb-3 rounded-lg rounded-br-[90px] rounded-tl-[90px]
      min-w-[240px] max-w-[240px] min-h-[240px] max-h-[240px] object-cover bg-white' src={Products?.selectedFile} alt={Products?.title} /></center>
      <div className='w-full h-full flex justify-center items-center
      opacity-0 hover:opacity-100 transition duration-300' style={{
          position: 'absolute',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "1rem",
        }}>
        <Link to={`/product/${Products?._id}`}>
          <button className='bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-300'>
            View Details
          </button>
        </Link>
        <FaRegHeart className='text-2xl 
        text-rose-600 transition duration-500
        ' style={hoverOn ? {
            display: "none"
          } : {
            position: 'absolute',
            top: "5%",
            right: "10%",
          }}
          onClick={() => {
            setHoverOn(prev => !prev);
          }}
        />
        <FaHeart className='text-2xl 
        text-rose-600 transition duration-500
        ' style={!hoverOn ? {
            display: "none"
          } : {
            position: 'absolute',
            top: "5%",
            right: "10%",
          }}
          onClick={() => {
            setHoverOn(prev => !prev);
          }}
        />
      </div>
      <div className='mb-4 flex gap-x-2 text-sm justify-center align-center'>
        <div>
          {Products?.tags.map((tag, index) => {
            return (
              <span className='capitalize bg-yellow-400 rounded-full text-white px-4 py-1 ml-1 inline-block' key={index}>
                {tag}</span>
            );
          }
          ).splice(0, 1)}
        </div>
        <div className=' rounded-full bg-[#FE3E69] hover:bg-[#fe2856] py-1 px-2 text-white inline-block'>
          Rs. {Products?.price}
        </div>
      </div>
      <div className='font-semibold text-center mb-3'>Item - {Products?.title.split(" ").slice(0, 6).join(" ")}</div>
    </div>
  );
};

export default Product;
