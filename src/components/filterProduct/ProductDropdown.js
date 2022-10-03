import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { TbDiscount } from 'react-icons/tb';
import { Menu } from '@headlessui/react';

const ProductDropdown = () => {
  const [property, setProperty] = useState('Discount product (any)');
  const [Products, setProducts] = useState(["Nike", "Addidas", "Other"]);
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
            {property}
          </div>
          <div className='text-[13px]'>Choose discount product</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {Products.map((property, index) => {
          return (
            <Menu.Item
              as='li'
              onClick={() => setProperty(property)}
              key={index}
              className='cursor-pointer hover:text-rose-700 transition'
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default ProductDropdown;
