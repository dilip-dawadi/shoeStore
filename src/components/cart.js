import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { HiShoppingCart } from "react-icons/hi";
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import { cartQuantity, getCarts, deleteCarts, checkoutAct, CartisOpen } from '../statemanagement/slice/cartSlice'
import { LoadingBtn, NotifyInfo } from '../toastify';
export default function Cart() {
    const { isOpenCart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    const { cartData, cartIds, status } = useSelector((state) => state.cart);
    const quantityUserHasAdded = cartIds.map((item) => item.quantity)
    const cartIdsOnly = cartIds.map((item) => item.cartId)
    const data = cartData.map((item) => {
        const index = cartIdsOnly.indexOf(item._id)
        return {
            ...item,
            quantityUserAdd: quantityUserHasAdded[index]
        }
    })
    function closeModal() {
        dispatch(CartisOpen(false))
    }
    function openModal() {
        if (cartIds.length === 0) {
            return NotifyInfo("Your cart is empty")
        }
        dispatch(CartisOpen(true))
    }
    function QuantityStatus({ status, shoeId }) {
        dispatch(cartQuantity({ status, shoeId }))
    }
    function DeleteCart(id) {
        dispatch(deleteCarts(id))
    }
    function CheckoutBtn(total) {
        dispatch(checkoutAct(total))
        dispatch(CartisOpen(false))
    }
    const size = window.innerWidth > 768 ? 'md' : 'sm'
    return (
        <>
            <button className={`bg-[#FE3E69] hover:bg-[#ff2f5c] ${size === 'md' && 'fixed right-0 top-3 mr-7'} z-50 rounded-full p-2 text-white cursor-pointer hover:scale-110 tansition-transform duration-300 ease-in-out`} onClick={openModal}>
                <p className='absolute text-white bg-[#FE3E69] rounded-full px-1 text-sm -mt-2 ml-6'>{cartIds?.length || 0}</p>
                <HiShoppingCart className='text-2xl' title='Your Cart' />
            </button>

            <Transition appear show={isOpenCart} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-50 bg-opacity-50" />
                    </Transition.Child>
                    <div className="fixed right-1 top-0 bottom-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md h-[96vh] transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all flex justify-center relative items-center">
                                    <div className="space-y-4 max-h-[82%] py-2 overflow-auto m-auto">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium absolute top-2 
                                            left-1/2 transform -translate-x-1/2               text-gray-900 text-center">
                                            Your Cart
                                        </Dialog.Title>
                                        <div className="grid grid-cols-1">
                                            {data?.slice()?.reverse()?.map((Products, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className='px-6 flex'>
                                                            <div className='bg-gray-50 relative'><img className={`relative min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] object-cover bg-white`} src={Products?.selectedFile[0]} alt={Products?.title} />
                                                                <AiFillMinusCircle title='remove'
                                                                    className='absolute inset-x-1 top-2 text-[#FE3E69] cursor-pointer text-2xl'
                                                                    onClick={() => DeleteCart(Products?._id)} />
                                                            </div>
                                                            <div className='flex flex-col items-center justify-around ml-4 bg-gray-50 px-1 pt-1 rounded-lg'>
                                                                <p className='text-sm font-bold'>{Products?.title?.slice(0, 15)}</p>
                                                                <div className='flex justify-around items-center w-full px-2 py-1 mb-1 rounded-lg bg-gray-100'>
                                                                    <div className='flex items-center text-xl text-rose-600 cursor-pointer'>
                                                                        <IoIosAddCircle title='Add'
                                                                            className='hover:text-rose-500 hover:scale-110'
                                                                            onClick={() => QuantityStatus({
                                                                                shoeId: Products?._id,
                                                                                status: 'increase'
                                                                            })} />
                                                                    </div>
                                                                    <p className='mx-2'>{
                                                                        status === 'increment' ? <LoadingBtn color={"black"} width={4} /> : Products?.quantityUserAdd
                                                                    }</p>
                                                                    <div className='flex items-center text-xl text-gray-600 cursor-pointer'>
                                                                        <AiFillMinusCircle title='minus' className='hover:text-gray-500 hover:scale-110' onClick={() => QuantityStatus({
                                                                            shoeId: Products?._id,
                                                                            status: 'decrease'
                                                                        })} />
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-around items-center bg-gray-100 px-4 py-[0.7rem] rounded-lg text-black font-medium '>
                                                                    <div className='max-w-[120px] mr-5'>
                                                                        {Products?.quantityUserAdd} x
                                                                    </div>
                                                                    <div className='text-black'>
                                                                        Rs. {Products?.quantityUserAdd * Products?.price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-[1px] bg-[#957272] my-4'></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="absolute bottom-3">
                                            <div className='flex items-center font-semibold'>
                                                <div className='relative left-10'>Total = Rs. {data?.reduce((acc, item) => acc + item?.quantityUserAdd * item?.price, 0)}
                                                </div>
                                                <button className='relative left-16 bg-[#FE3E69] hover:bg-[#ff2f5c] text-white px-4 py-[0.42rem] rounded-lg hover:scale-105' onClick={() => CheckoutBtn(data?.reduce((acc, item) => acc + item?.quantityUserAdd * item?.price, 0))}>Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}