import React from 'react';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/filterProduct/Search';
import { getAllWishList } from '../statemanagement/slice/WishList';
const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishListData, loading, error } = useSelector((state) => state.wishList);
    const { page, limit, sort, brand, category, price } = useSelector((state) => state.filterShoes);
    React.useEffect(() => {
        dispatch(getAllWishList(page, limit, sort, brand, category, price));
    }, [dispatch, page, limit, sort, brand, category, price]);
    return (
        <div className='min-h-[600px] mt-10'>
            <Search />
            <ProductList data={wishListData} loading={loading} error={error} title='WishList' />
        </div>
    );
};

export default Wishlist;
