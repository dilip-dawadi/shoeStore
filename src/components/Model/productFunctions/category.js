import React, { useState } from "react";
import { NotifyInfo } from "../../../toastify";

export default function Categorys({ category, setCategory, AddProductData }) {
    const ENTER = 13;
    const COMMA = 188;
    const SPACE = 32;
    const BACKSPACE = 8;
    const [value, setValue] = useState("");

    const handleKeyUp = (e) => {
        const key = e.keyCode;
        if (key === COMMA || key === SPACE || key === ENTER) {
            addCategory();
        }
    };

    const handleKeyDown = (e) => {
        const key = e.keyCode;
        if (key === BACKSPACE && !value) {
            editCategory();
        }
    };

    const addCategory = () => {
        let addCat = value.trim().replace(/,/g, "");
        if (!addCat) return;
        if (category.find((t) => t.toLowerCase() === addCat.toLowerCase())) return;
        setCategory({ ...AddProductData, category: [...category, addCat] });
        setValue("");
    };
    const resetCategory = () => {
        setValue("");
        setCategory({
            ...AddProductData, category: ["Men", "Women", "Kids"]
        })
    };
    const editCategory = () => setValue(category.pop());

    return (
        <div className="
                flex flex-wrap
                items-center
                justify-center
                w-full
            ">
            {category?.map((cat, index) => (
                <div key={index} className="
                        flex items-center
                        bg-gray-100
                        rounded-full
                        px-3 py-1
                         mb-0 mr-2
                        text-md
                        text-gray-800
                        font-medium
                    ">
                    {cat}
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
                            setCategory({
                                ...AddProductData,
                                category: category.filter((t) => t !== cat || category.length === 1),
                            });
                            if (category.length === 1) {
                                NotifyInfo("You must have at least one category");
                            }
                        }}
                    >
                        <span className="sr-only">Remove Category</span>
                        <svg
                            className="h-2 w-2"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 8 8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6M1 7l6-6"
                            />
                        </svg>
                    </button>
                </div>
            ))}
            <button type="button" className=" bg-gray-100 rounded-full px-3 py-1 mb-0 mr-2 text-md
                        text-gray-800 font-medium" onClick={resetCategory}> Reset </button>
            {/* <input
                type="text"
                placeholder="Press enter, space or comma to add category"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            /> */}
        </div>
    );
}
