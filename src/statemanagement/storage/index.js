import { configureStore } from '@reduxjs/toolkit'
import { shoeReducer } from '../slice/ShoeSlice/Shoe'
import { wishListReducer } from '../slice/WishList'
import { cartReducer } from '../slice/cartSlice'
import { filterReducer } from '../slice/filterShoes'
export const store = configureStore({
    reducer: {
        shoeDetails: shoeReducer,
        wishList: wishListReducer,
        filterShoes: filterReducer,
        cart: cartReducer
    }
})