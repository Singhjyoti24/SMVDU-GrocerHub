import authReducer from './auth-slice';
import { configureStore } from '@reduxjs/toolkit';
import adminProductsSlice from "./admin/products-slice";
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";
import shoppingFeedbackSlice from "./shop/feedback-slice"
import shoppingOrderSlice from "./shop/order-slice"
import adminOrderSlice from "./admin/order-slice";
import searchSlice from "./shop/search-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,

        shopProducts: shoppingProductSlice,
        shopCart: shoppingCartSlice,
        shopAddress: addressSlice,
        shoppingFeedback: shoppingFeedbackSlice,
        shopOrder: shoppingOrderSlice,
        shopSearch: searchSlice,
    }
});

export default store;