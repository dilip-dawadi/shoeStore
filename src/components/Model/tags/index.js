import React, { useState } from "react";

export default function Tags({ tags, setTags, AddProductData }) {
    const ENTER = 13;
    const COMMA = 188;
    const SPACE = 32;
    const BACKSPACE = 8;
    const [value, setValue] = useState("");

    const handleKeyUp = (e) => {
        const key = e.keyCode;
        if (key === COMMA || key === SPACE || key === ENTER) {
            addTag();
        }
    };

    const handleKeyDown = (e) => {
        const key = e.keyCode;
        if (key === BACKSPACE && !value) {
            editTag();
        }
    };

    const addTag = () => {
        let tag = value.trim().replace(/,/g, "");
        if (!tag) return;
        if (tags.find((t) => t.toLowerCase() === tag.toLowerCase())) return;
        setTags({ ...AddProductData, tags: [...tags, tag] });
        setValue("");
    };

    const editTag = () => setValue(tags.pop());

    return (
        <div className="
                flex flex-wrap
                items-center
                w-full
            ">
            {tags.map((tag, index) => (
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
                    {tag}
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
                            setTags({
                                ...AddProductData,
                                tags: tags.filter((t) => t !== tag),
                            });
                        }}
                    >
                        <span className="sr-only">Remove tag</span>
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
            <input
                type="text"
                placeholder="Press enter, space or comma to add tags"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
