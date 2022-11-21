import React from 'react';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShoe } from '../statemanagement/slice/ShoeSlice';
import Search from '../components/filterProduct/Search';

function ProductPage() {
    const dispatch = useDispatch();
    const { shoeData, loading, error, runningData, loungingData, everydayData } = useSelector((state) => state.shoeDetails);
    const { page, limit, sort, brand, category, price } = useSelector((state) => state.filterShoes);
    React.useEffect(() => {
        dispatch(getAllShoe({ page, limit, sort, brand, category, price }));
    }, [dispatch, page, limit, sort, brand, category, price]);
    const style = {
        textAlign: 'left',
        marginLeft: '10px',
    };
    return (
        <div className='min-h-[600px] mt-10'>
            <Search brandValue={brand} categoryValue={category} priceValue={price} pageValue={page} loading={loading} />
            <ProductList data={shoeData} loading={loading} error={error} category={category} title='All Products' runningData={runningData} loungingData={loungingData} everydayData={everydayData} style={style} />
        </div>
    );
}

export default ProductPage;
