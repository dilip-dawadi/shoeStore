import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { TbDiscount } from 'react-icons/tb';
import { Menu } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { LoadingBtn } from '../../toastify';

const ProductDropdown = ({ Category, setCategory }) => {
  const { categoryData, status } = useSelector((state) => state.filterShoes);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full text-left'
      >
        <TbDiscount className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>
            {Category}
          </div>
          <div className='text-[13px]'>Choose category</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {status !== 'idle' ? <LoadingBtn color={"black"} width={10} /> :
          categoryData?.map((Category, index) => {
            return (
              <Menu.Item
                as='li'
                onClick={() => setCategory(Category)}
                key={index}
                className='cursor-pointer hover:text-rose-700 transition'
              >
                {Category}
              </Menu.Item>
            );
          })}
      </Menu.Items>
    </Menu>
  );
};

export default ProductDropdown;
