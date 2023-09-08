import {createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart : [],
}
const cartSlice = createSlice({
      name:'cart',
      initialState,
        reducers:{
            addToCart:(state,action)=>{
                state.cart.push(action.payload)
            },
            removeFromCart:(state,action)=>{
                state.cart = state.cart.filter(item=>item.id !== action.payload.id)
            },
            emptyCart:(state)=>{
                state.cart = []
            }
        } 

})
export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
