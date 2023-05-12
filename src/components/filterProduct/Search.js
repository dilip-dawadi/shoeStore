import React from 'react';
import BrandDropdown from './BrandDropdown';
import CategoryDropdown from './Category';
import PriceRangeDropdown from './PriceRangeDropdown';
import { RiSearch2Line } from 'react-icons/ri';
import { setBrandValue, setPriceValue, setCategoryValue, getAllFilterData, setPageValue } from '../../statemanagement/slice/filterShoes';
import { useDispatch } from 'react-redux';
import { NotifyInfo, NotifySuccess, NotifyWarning } from '../../toastify';
import Pagination from './pagination';
const Search = ({ brandValue, categoryValue, priceValue, pageValue }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllFilterData());
  }, [dispatch]);

  const [Category, setCategory] = React.useState(categoryValue || 'Category (any)');
  const [Price, setPrice] = React.useState(priceValue || 'Price range (any)');
  const [Brand, setbrand] = React.useState(brandValue || 'Brand (any)');
  const [Page, setPage] = React.useState(pageValue || "Page (any)");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Page !== "Page (any)" && Page !== "All Pages") {
      dispatch(setPageValue(Page));
    } else {
      dispatch(setPageValue(''));
    }
    if (Category !== 'Category (any)' && Category !== 'All Categories') {
      dispatch(setCategoryValue(Category));
    } else {
      dispatch(setCategoryValue(''));
    }
    if (Price !== 'Price range (any)' && Price !== 'All Prices') {
      dispatch(setPriceValue(Price));
    } else {
      dispatch(setPriceValue(''));
    }
    if (Brand !== 'Brand (any)' && Brand !== 'All Brands') {
      dispatch(setBrandValue(Brand));
    } else {
      dispatch(setBrandValue(''));
    }
    if (Brand === 'Brand (any)' && Price === 'Price range (any)' && Category === 'Category (any)' && Page === "Page (any)") {
      return NotifyWarning('Please select any filter');
    }
    if (Category === 'All Categories' && Price === 'All Prices' && Brand === 'All Brands' && Page === "All Pages" && brandValue === '' && priceValue === '' && categoryValue === '' && pageValue === '') {
      return NotifyWarning('No filter selected');
    }
    if (Brand === brandValue && Price === priceValue && Category === categoryValue) {
      return NotifyInfo(`You have already selected ${Brand} brand, ${Price} price range and ${Category} category`);
    }
    NotifySuccess('Filter applied successfully');
  };
  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col items-center lg:flex-row justify-between gap-4 lg:gap-x-3 relative -top-3 lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      <BrandDropdown brand={Brand} setbrand={setbrand} />
      <CategoryDropdown Category={Category} setCategory={setCategory} />
      <PriceRangeDropdown price={Price} setPrice={setPrice} />
      <Pagination Page={Page} setPage={setPage} />
      <button
        className='bg-[#FE3E69] hover:bg-[#fe2856] transition w-full py-4 lg:max-w-[132px] rounded-lg flex justify-center items-center text-white text-lg' onClick={handleSubmit}>
        <RiSearch2Line />
      </button>
      <div style={{
        position: "absolute",
        content: "",
        width: "40px",
        height: "1px",
        background: "#f53737",
        bottom: "-35px",
        left: "50%",
        transform: "translate(-50%)",
        marginLeft: "-10px",
      }}></div>
      <div style={{
        position: "absolute",
        content: "",
        width: "40px",
        height: "1px",
        background: "#f53737",
        bottom: "-25px",
        left: "50%",
        transform: "translate(-50%)"
      }}></div>
    </div>
  );
};

export default Search;
