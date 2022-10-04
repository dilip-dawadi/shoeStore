import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        function getAllClients() {
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbnplcmRhd2FkaTEyM0BnbWFpbC5jb20iLCJpZCI6IjYyZTdlOGEyYTIxNTFmNjcxNmFhMTA4NSIsInJvbGUiOjAsImlhdCI6MTY2MjQwNTA5OCwiZXhwIjoxNjYyNDkxNDk4fQ.tJLND7c576E132ohaGwiObamDk4ur7vedvKhPIJ2pS0'
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
                    setData(response.foodPageData);

                }).catch(error => {
                    console.error(error);
                });
        }
        getAllClients();
    }, []);
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
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
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);
    if (data.length === 0) {
        return <div></div>
    }
    return (
        <div className="container mx-auto mb-2">
            <div className="relative">
                <div style={{
                    position: "absolute",
                    content: "",
                    width: "40px",
                    height: "1px",
                    background: "#f53737",
                    // bottom: "0px",
                    top: "-16px",
                    left: "50%",
                    transform: "translate(-50%)",
                    marginLeft: "-10px",
                }}></div>
                <div
                    className='text-center text-4xl font-medium text-black mb-2'
                >Top Sales</div>
                <div
                    className='text-center
          text-gray-700 mb-7 text-lg font-light max-w-2xl mx-auto italic'
                >Add our products to weekly lineup</div>
                <div style={{
                    position: "absolute",
                    content: "",
                    width: "40px",
                    height: "1px",
                    background: "#f53737",
                    top: "-24px",
                    zIndex: 1000,
                    left: "50%",
                    transform: "translate(-50%)",
                }}></div>
            </div>
            <div className="relative overflow-hidden">
                <div className="flex justify-between absolute top left w-full h-full">
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
                        className="text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:mr-4 z-10 p-0 m-0 transition-all ease-in-out duration-300"
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
                    className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                >
                    {data?.slice().reverse().map((item, index) => {
                        return (
                            <Link to={`/product/${item._id}`} key={index}>
                                <div className='cursor-pointer shadow-lg mr-4 mb-4 rounded-xl bg-rose-600 hover:shadow-xl transition relative'>
                                    <img className='rounded-lg min-w-[240px] max-w-[240px] min-h-[250px] max-h-[250px] object-cover bg-white' src={item.selectedFile} alt={item.title} />
                                    <h3 className="text-rose-100 font-medium my-2 mx-auto text-lg
                                letter-spacing-[2px] text-center">
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
