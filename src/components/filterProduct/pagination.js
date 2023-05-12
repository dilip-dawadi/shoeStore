import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { TbDiscount } from 'react-icons/tb';
import { Menu } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { LoadingBtn } from '../../toastify';

const Pagination = ({ Page, setPage }) => {
    const { pageData, status } = useSelector((state) => state.filterShoes);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Menu as='div' className='dropdown relative lg:max-w-[200px]'>
            <Menu.Button
                onClick={() => setIsOpen(!isOpen)}
                className='dropdown-btn w-full text-left'
            >
                <TbDiscount className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {Page === 'Page (any)' || Page === "All Pages" ? Page : `Page ${Page}`}
                    </div>
                    <div className='text-[13px]'>Choose Page</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />
                ) : (
                    <RiArrowDownSLine className='dropdown-icon-secondary' />
                )}
            </Menu.Button>

            <Menu.Items className='dropdown-menu'>
                {status !== 'idle' ? <LoadingBtn color={"black"} width={10} /> :
                    pageData?.map((Page, index) => {
                        return (
                            <Menu.Item
                                as='li'
                                onClick={() => setPage(Page)}
                                key={index}
                                className='cursor-pointer hover:text-rose-700 transition'
                            >
                                {Page}
                            </Menu.Item>
                        );
                    })}
            </Menu.Items>
        </Menu>
    );
};

export default Pagination;
