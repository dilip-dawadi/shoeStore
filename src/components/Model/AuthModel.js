import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Auth({ IsSignup, setIsSignup, text, closeModalDropDown }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const navigate = useNavigate()
    const [authData, setAuthData] = React.useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        address: "",
        number: "",
    })
    function closeModal() {
        setIsOpen(false)
        window.innerWidth < 768 && closeModalDropDown();
    }
    function openModal() {
        setIsOpen(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (IsSignup) {
            if (authData.password !== authData.confirmPassword) {
                alert("Password do not match");
            }
        }
        fetch(`${process.env.REACT_APP_BASE_URL}user/${IsSignup ? "signup" : "signin"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authData)
        })
            .then(response => {
                return response.json();
            })
            .then((response) => {
                if (response) {
                    if (response.token && response.data) {
                        localStorage.setItem("token", response?.token);
                        localStorage.setItem("userData", JSON.stringify(response?.data));
                    }
                    closeModal();
                    window.innerWidth < 768 && closeModalDropDown();
                    navigate("/");
                    alert(response.message);
                } else {
                    alert(response.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };
    const handleChange = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <p
                type="button"
                className='cursor-pointer'
                onClick={openModal}
            >
                {text}
            </p>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <form className="mb-0 md:space-y-5 space-y-2" autoComplete="off" onSubmit={handleSubmit} >
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                                        >
                                            {IsSignup ? "Sign up for an account" : "Log in to your account"}
                                        </Dialog.Title>
                                        {IsSignup && (
                                            <>
                                                <div className="w-full md:w-1/2 md:inline-block md:mr-1">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <div className="mt-1">
                                                        <input name="firstName" type="text" onChange={handleChange} />
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-[48%] md:inline-block">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <div className="mt-1">
                                                        <input onChange={handleChange} name="lastName" type="text" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div>
                                            <label htmlFor="email">Email address</label>
                                            <div className="mt-1">
                                                <input onChange={handleChange} id="email" name="email" type="email" autoComplete="email" />
                                            </div>
                                        </div>
                                        <div className={
                                            IsSignup ? "w-full md:w-1/2 md:inline-block md:mr-1" : "w-full"
                                        }>
                                            <label htmlFor="password">Password</label>
                                            <div className="mt-1">
                                                <input onChange={handleChange} name="password" type="password" onClick={(e) => {
                                                    e.target.type = "text";
                                                }}
                                                    onBlur={(e) => {
                                                        e.target.type = "password";
                                                    }} />
                                            </div>
                                        </div>
                                        {IsSignup && (
                                            <>
                                                <div className="w-full md:w-[48%] md:inline-block">
                                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                                    <div className="mt-1">
                                                        <input onChange={handleChange} name="confirmPassword" type="password"
                                                            onClick={(e) => {
                                                                e.target.type = "text";
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.type = "password";
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/2 md:inline-block md:mr-1">
                                                    <label htmlFor="address">Address</label>
                                                    <div className="mt-1">
                                                        <input onChange={handleChange} name="address" type="text" />
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-[48%] md:inline-block">
                                                    <label htmlFor="number">Contact Number</label>
                                                    <div className="mt-1">
                                                        <input onChange={handleChange} name="number" type="tel" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex items-center">
                                            <input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" />
                                            <label htmlFor="terms-and-privacy" className="ml-2 block text-sm text-gray-900"
                                            >I agree to the
                                                <a href="/" className="text-indigo-600 hover:text-indigo-500"> Terms </a>
                                                and
                                                <a href="/" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy </a>.
                                            </label>
                                        </div>

                                        <div>
                                            <button className="w-1/2 inline-block mr-1 text-rose-800"
                                                type='button'
                                                onClick={() => {
                                                    setIsSignup(!IsSignup);
                                                }}>
                                                {IsSignup ? "Sign in instead" : "Create Account"}
                                            </button>
                                            <button type="submit" className="w-[48%] inline-block justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#fe2856] hover:bg-[#bc052c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fe2856]">
                                                {IsSignup ? "Sign Up" : "Log In"}
                                            </button>
                                        </div>
                                        <p className="text-center text-sm text-gray-500
                                        first-letter:capitalize">
                                            click on the overlay to close the popup window
                                        </p>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}