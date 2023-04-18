import React, {  useContext } from 'react'
import styles from './SingleMeal.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../Store/cart-context'

const SingleMeal = ({ meal }) => {

    const cartCtx = useContext(CartContext)

    const price = `$${meal.price.toFixed(2)}`

    const AddToCartHandler = (amount)=>{
        cartCtx.addItem({
            id : meal.id ,
            amount :amount ,
            price : meal.price,
            name : meal.name
        })
    }

    return (
        <li className={styles.meal}>
            <div>
                <h3>{meal.name}</h3>
                <div className={styles.description}>{meal.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={AddToCartHandler} id={meal.id} />
            </div>
        </li>
    )
}

export default SingleMeal