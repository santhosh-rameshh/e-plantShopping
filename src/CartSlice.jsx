import { createSlice } from '@reduxjs/toolkit';

export const CreatSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0 // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity++;
        state.totalPrice += parseFloat(cost.substring(1));
    },
    removeItem: (state, action) => {
        const itemToRemove = state.items.find(item => item.name === action.payload);
        if (itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity;
            state.totalPrice -= parseFloat(itemToRemove.cost.substring(1)) * itemToRemove.quantity;
            state.items = state.items.filter(item => item.name !== action.payload);
        }
    },
    incrementQuantity: (state, action) => {
        const itemToIncrement = state.items.find(item => item.name === action.payload);
        if (itemToIncrement) {
            itemToIncrement.quantity++;
            state.totalQuantity++;
            state.totalPrice += parseFloat(itemToIncrement.cost.substring(1));
        }
    },
    decrementQuantity: (state, action) => {
        const itemToDecrement = state.items.find(item => item.name === action.payload);
        if (itemToDecrement && itemToDecrement.quantity > 1) {
            itemToDecrement.quantity--;
            state.totalQuantity--;
            state.totalPrice -= parseFloat(itemToDecrement.cost.substring(1));
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CreatSlice.actions;

export default CreatSlice.reducer;