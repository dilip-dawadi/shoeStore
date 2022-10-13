import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import UploadImage from '../firebase/UploadImage'
import Tags from './tags'
export default function AddProduct() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [AddProductData, setAddProductData] = React.useState({
        title: '',
        description: '',
        price: '',
        tags: [],
        quantity: '',
        selectedFile: []
    })
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_BASE_URL}shoesPage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(AddProductData)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    alert("Product Added Successfully")
                    closeModal();
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        setAddProductData({ ...AddProductData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <p
                type="button"
                className='cursor-pointer'
                onClick={openModal}
            >
                Add Product
            </p>

            <Transition appear show={isOpen} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mb-0 md:space-y-4 space-y-2">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                                        >
                                            Add New Shoes
                                        </Dialog.Title>
                                        <div>
                                            <label htmlFor="title">Title</label>
                                            <div className="mt-1">
                                                <input onChange={handleChange} id="title" name="title" type="text" autoComplete="title" />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="description">Description</label>
                                            <div className="mt-1">
                                                <textarea onChange={handleChange} id="description" name="description" type="text"
                                                    rows={2} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <UploadImage AddProductData={AddProductData} setAddProductData={setAddProductData} />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="tags">Tags</label>
                                            <div className="mt-1">
                                                <Tags tags={AddProductData.tags} setTags={setAddProductData} AddProductData={AddProductData} />
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 md:inline-block md:mr-1">
                                            <label htmlFor="quantity">Quantity</label>
                                            <div className="mt-1">
                                                <input onChange={handleChange}
                                                    name="quantity" type="text" />
                                            </div>
                                        </div>
                                        <div className="w-full md:w-[48%] md:inline-block">
                                            <label htmlFor="price">Price</label>
                                            <div className="mt-1">
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-3 text-sm rounded-l-md border border-r-0 dark:bg-[#fff] dark:text-black dark:border-[#edd5da]">
                                                        Rs.
                                                    </span>
                                                    <input type="text" onChange={handleChange}
                                                        pattern="[0-9]*" name="price" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:border-rose-500
                                                        focus:border-l-0 block flex-1 min-w-0 w-full text-sm border-[#edd5da] p-2.5 dark:bg-white dark:text-black dark:border-[#edd5da]" placeholder="price" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" id="submit" onClick={(e) => handleSubmit(e)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#fe2856] hover:bg-[#fe2856] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fe2856]">
                                            Add Product
                                        </button>
                                        <p className="text-center text-sm text-gray-500
                                        first-letter:capitalize">
                                            click on the overlay to close the popup window
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}