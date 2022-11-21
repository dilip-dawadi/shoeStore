import React from "react";
import { NotifyInfo } from "../../../toastify";

export default function ShoeForOption({ shoeFor, setShoeFor, AddProductData }) {
    const reSetshoeFor = () => {
        setShoeFor({
            ...AddProductData, shoeFor: ["Lounging", "Everyday", "Running"]
        })
    };
    return (
        <div className="
                flex flex-wrap
                items-center
                justify-center
                w-full
            ">
            {shoeFor?.map((forOption, index) => (
                <div key={index} className="
                        flex items-center
                        bg-gray-100
                        rounded-full
                        px-3 py-1
                         mb-2 mr-2
                        text-md
                        text-gray-800
                        font-medium
                    ">
                    {forOption}
                    <button
                        type="button"
                        className="
                            ml-2
                            flex-shrink-0
                            flex
                            items-center
                            justify-center
                            h-4 w-4
                            rounded-full
                            bg-[#fe2856]
                            text-white
                            text-xs
                            font-medium
                            leading-none
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-offset-gray-100
                            focus:ring-[#fe2856]
                        "
                        onClick={() => {
                            setShoeFor({
                                ...AddProductData,
                                shoeFor: shoeFor.filter((t) => t !== forOption || shoeFor.length === 1),
                            });
                            if (shoeFor.length === 1) {
                                NotifyInfo("You must have at least one shoeFor option");
                            }
                        }}
                    >
                        <span className="sr-only">Remove shoeFor</span>
                        <svg
                            className="h-2 w-2"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 8 8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6M1 7l6-6"
                            />
                        </svg>
                    </button>
                </div>
            ))}
            <button type="button" className=" bg-gray-100 rounded-full px-3 py-1 mb-2 mr-2 text-md
                        text-gray-800 font-medium" onClick={reSetshoeFor}> Reset </button>
        </div>
    );
}
