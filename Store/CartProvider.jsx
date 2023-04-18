import React, { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = ((state, action) => {


    if (action.type === 'ADD_TO_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const existingItemIndex = state.items.findIndex( (item) =>item.id == action.item.id)
        const existingItem = state.items[existingItemIndex]
        let updatedItem;
        let updatedItems;
    
        if(existingItem){
            updatedItem = {
                ...existingItem,
                amount :existingItem.amount + action.item.amount
            }
            updatedItems = [...state.items ]
            updatedItems[existingItemIndex] = updatedItem
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        return{
            items : updatedItems,
            totalAmount:updatedTotalAmount
        }




        
    }

    if(action.type === 'REMOVE_FROM_CART'){
        
        let cartItemIndex = state.items.findIndex(item => item.id === action.id)
        let cartItem = state.items[cartItemIndex]
        const updatedTotalAmount = state.totalAmount -  cartItem.price ;
        let updatedItems ;


        if(cartItem.amount === 1){
            updatedItems = state.items.filter((item)=>{
                return item.id !== action.id
            })
            
        }
       
        else{
            const updatedItem = {...cartItem , amount :cartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem
            
        }

        return{
            items:updatedItems,
            totalAmount : updatedTotalAmount
        }
    }



    return defaultCartState
})

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_TO_CART',
            item: item,
        })
    }

    const removeFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_FROM_CART',
            id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider