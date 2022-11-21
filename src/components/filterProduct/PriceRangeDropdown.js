import React, { useState } from 'react';
import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from 'react-icons/ri';
import { Menu } from '@headlessui/react';

const PriceRangeDropdown = ({ price, setPrice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prices = [
    {
      value: 'All Prices',
    },
    {
      value: '1000 - 5000',
    },
    {
      value: '5000 - 10000',
    },
    {
      value: '10000 - 15000',
    },
    {
      value: '15000 - 20000',
    },
  ];

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full'
      >
        <RiWallet3Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight text-left'>{price}</div>
          <div className='text-[13px]'>Choose price range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {prices.map((price, index) => {
          return (
            <Menu.Item
              as='li'
              onClick={() => setPrice(price.value)}
              key={index}
              className='cursor-pointer hover:text-rose-700 transition'
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
