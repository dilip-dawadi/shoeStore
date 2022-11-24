import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import { GiRunningShoe } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { LoadingBtn } from '../../toastify';

const BrandDropdown = ({ brand, setbrand }) => {
  const { brandData, status } = useSelector((state) => state.filterShoes);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full text-left'
      >
        <GiRunningShoe className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{brand}</div>
          <div className='text-[13px]'>Select your brand</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {status !== 'idle' ? <LoadingBtn color={"black"} width={10} /> :
          brandData?.map((brand, index) => {
            return (
              <Menu.Item
                as='li'
                onClick={() => setbrand(brand)}
                key={index}
                className='cursor-pointer hover:text-rose-700 transition'
              >
                {brand}
              </Menu.Item>
            );
          })}
      </Menu.Items>
    </Menu>
  );
};

export default BrandDropdown;
