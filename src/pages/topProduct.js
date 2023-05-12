import React from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getTopShoe } from '../statemanagement/slice/ShoeSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Link } from 'react-router-dom';
const Carousel = () => {
    const dispatch = useDispatch();
    const { topShoeData, loading } = useSelector((state) => state.shoeDetails);
    React.useEffect(() => {
        dispatch(getTopShoe());
    }, [dispatch]);
    const windowWidth = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : window.innerWidth <= 1280 ? 3 : 4;
    if (loading) return <div></div>;
    return (
        <div className='container mx-auto'>
            <div className="relative">
                <div className='absolute w-[40px] h-[1px] bg-[#f53737] top-[-16px] left-1/2 transform -translate-x-1/2 ml-[-10px]'></div>
                <div
                    className='text-center text-[1.75rem] font-bold text-black mb-2'
                >Top Sales</div>
                <div className='text-center text-gray-700 mb-7 mx-auto text-md font-light max-w-2xl italic'>Add our products to weekly lineup</div>
                <div className='absolute w-[40px] h-[1px] bg-[#f53737] top-[-24px] left-1/2 transform -translate-x-1/2 z-[1000]'></div>
            </div>
            <Swiper
                effect='coverflow'
                slidesPerView={windowWidth}
                spaceBetween={25}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                keyboard={{
                    enabled: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {topShoeData?.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="pb-10">
                                <div className={`shadow-xl px-3 pt-3 pb-2 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-xl transition relative`}>
                                    <center><img className={`mb-3 rounded-tl-[90px]
      min-w-[240px] max-w-[240px] min-h-[240px] max-h-[240px] object-cover`} src={item?.selectedFile[0]} alt={item?.title} /></center>
                                    <div className='w-full h-full flex justify-center items-center rounded-lg rounded-tl-[90px]
      opacity-0 hover:opacity-100 transition duration-500 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ease-in-out hover:bg-[#00000003]'>
                                        <Link to={`/product/${item?._id}`}>
                                            <button className='bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-300'>
                                                <BsEyeFill className='text-xl' />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='mb-2 flex text-sm justify-between px-2 align-center'>
                                        {item?.shoeFor?.map((shoeF, index) => {
                                            const IndexStyle = index === 0 ? 'bg-yellow-400' : 'bg-rose-600';
                                            return (
                                                <span className={`capitalize ${IndexStyle} rounded-lg text-white px-4 py-[0.35rem] tracking-[.04em]`} key={index}>{shoeF}</span>
                                            );
                                        }
                                        ).splice(0, 2)}
                                    </div>
                                    <div className='flex justify-between mb-0 bg-gray-200 px-4 py-[0.7rem] rounded-lg text-black font-medium'>
                                        <div className='max-w-[120px]'>
                                            {item?.title.split(" ").slice(0, 6).join(" ")}
                                        </div>
                                        <div className='text-black'>
                                            Rs. {item?.price}
                                        </div>
                                    </div>
                                </div >
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper >
        </div >
    );
};

export default Carousel;
