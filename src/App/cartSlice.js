import {createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart : [],
}
const cartSlice = createSlice({
      name:'cart',
      initialState,
        reducers:{
            addToCart: (state, action) => {
                const coinToAdd = action.payload;
              
                const coinExists = state.cart.some(item => {
                  console.log('Comparing:', coinToAdd, item);
                  return item  === coinToAdd;
                });
              
                console.log('Coin exists:', coinExists);
              
                if (!coinExists) {
                  state.cart.push(coinToAdd);
                }
            
              },
              
            // removeFromCart: (state, action) => {
            //     const indexToRemove = state.cart.findIndex(item => item.uuid === action.payload.uuid);
            //     if (indexToRemove !== -1) {
            //       state.cart.splice(indexToRemove, 1);
            //     }
            //   },
            removeFromCart: (state, action) => {
                state.cart = state.cart.filter(item => item !== action.payload);
              },
              

            // removeFromCart: (state, action) => {
                
            //     const indexToRemove = state.cart.findIndex(item => item.uuid === action.payload);
            //     console.log("id:",action.payload);
            //     if (indexToRemove !== -1) {
            //       state.cart.splice(indexToRemove, 1);
            //     }
            //   },
              
              
            emptyCart:(state)=>{
                state.cart = []
            }
        } 

})
export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
