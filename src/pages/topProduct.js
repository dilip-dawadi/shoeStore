import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        function getAllClients() {
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            });

            return fetch(`${process.env.REACT_APP_BASE_URL}shoesPage?page=1&limit=4&sort=-createdAt&tags=none&title[regex]=none`, {
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
                    setData(response.productPageData);

                }).catch(error => {
                    console.error(error);
                });
        }
        getAllClients();
    }, []);
    const maxWidthToScroll = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxWidthToScroll.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxWidthToScroll.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
        maxWidthToScroll.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
    }, [currentIndex, data]);
    if (data?.length === 0) {
        return <div></div>
    }
    return (
        <div className="container mx-auto mb-2">
            <div className="relative">
                <div className='absolute w-[40px] h-[1px] bg-[#f53737] top-[-16px] left-1/2 transform -translate-x-1/2 ml-[-10px]'></div>
                <div
                    className='text-center text-4xl font-medium text-black mb-2'
                >Top Sales</div>
                <div className='text-center text-gray-700 mb-7 text-lg font-light max-w-2xl mx-auto italic'>Add our products to weekly lineup</div>
                <div className='absolute w-[40px] h-[1px] bg-[#f53737] top-[-24px] left-1/2 transform -translate-x-1/2 z-[1000]'></div>
            </div>
            <div className="relative overflow-hidden">
                <div className="flex justify-between absolute top left right bottom w-full h-full">
                    <button
                        onClick={movePrev}
                        className="text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        disabled={isDisabled('prev')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-10 -ml-1 bg-rose-500/75 hover:bg-rose-700/75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Prev</span>
                    </button>
                    <button
                        onClick={moveNext}
                        className="text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        disabled={isDisabled('next')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-10 ml-0 bg-rose-500/75 hover:bg-rose-700/75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
                <div
                    ref={carousel}
                    className="carousel-container relative flex items-center justify-between gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                >
                    {data?.map((item, index) => {
                        return (
                            <Link to={`/product/${item._id}`} key={index}>
                                <div className='cursor-pointer shadow-md mx-2 my-2 rounded-xl bg-rose-600 hover:shadow-lg transition relative'>
                                    <img className='rounded-lg min-w-[240px] max-w-[240px] min-h-[250px] max-h-[250px] object-cover bg-white' src={item.selectedFile[0]} alt={item.title} />
                                    <div className='w-full h-full flex justify-center items-center
      opacity-0 hover:opacity-100 transition duration-500 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ease-in-out'>
                                        <button className='bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-300'>
                                            View Details
                                        </button>
                                    </div>
                                    <h3 className="text-rose-100 font-medium py-1 text-lg
                                letter-spacing-[2px] flex items-center justify-center">
                                        {item.title.split(" ").slice(0, 3).join(" ")}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default Carousel;
