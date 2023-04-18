import React, { useContext, useEffect, useState } from 'react'
import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../../Store/cart-context'

const HeaderCartButton = ({onShowCart}) => {

    const [btnHighligthed, setBtnHighligthed] = useState(false);
    const ctx = useContext(CartContext)

    const buttonClasses = `${styles.button} ${btnHighligthed && styles.bump}`

    let numberOfCartItems = ctx.items.reduce((currNum , item)=>{
        return currNum + item.amount
    },0)


    useEffect(() => {
        if(ctx.items.length === 0) return;
        setBtnHighligthed(true);
        const timer = setTimeout(()=>{
            setBtnHighligthed(false);
        },300)

        return () => {
            clearTimeout(timer)
        };
    }, [ctx.items]);


    
    return (
        <button className={buttonClasses} onClick={onShowCart} >
            <span className={styles.icon}><CartIcon/></span>
            <span >Your cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton