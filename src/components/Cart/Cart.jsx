import React, { useContext } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../../Store/cart-context'
import CartItem from './CartItem'

const Cart = ({ onHideCart }) => {

    const cartCtx = useContext(CartContext)

    console.log(cartCtx.totalAmount , "cartCtx.totalAmount")

    const totalAmont = ` $${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = (item => {
        cartCtx.addItem({...item,amount : 1})
    })

    const cartItemRemoveHandler = (id => {
        cartCtx.removeItem(id)
    })
    
    const cartItems = <ul className={styles['cart-items']}>{
        cartCtx.items.map(item => 
        <CartItem key={item.id} amount={item.amount} name={item.name} price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null , item.id)} 
        onAdd={cartItemAddHandler.bind(null , item)} />
        )
    }
    </ul>


    return (
        <Modal onHideCart={onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{cartCtx.totalAmount<0 ? '00.00' : totalAmont}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={onHideCart} >Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart