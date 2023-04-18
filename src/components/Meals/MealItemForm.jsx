import React, { useContext, useRef, useState } from 'react'
import styles from './MealItemForm.module.css'
import Input from '../UI/Input'

const MealItemForm = ({id , onAddToCart}) => {

    const [amountIsValid, setAmountIsValid] = useState(true);
   
    const amountRef = useRef()

    const submitHandler = (e)=>{
        e.preventDefault()
        const enteredAmount = amountRef.current.value
        const enteredAmountNumber = + enteredAmount;

        if(enteredAmount.trim().length ===0 || enteredAmountNumber < 1 || enteredAmountNumber > 9 ){
            setAmountIsValid(false)
            return  
        }

        onAddToCart(enteredAmountNumber)
    }

    return (
        <form onSubmit={submitHandler}  className={styles.form}>
            <Input ref={amountRef}  label='Amount' input={{
                id:`amount${id}`,
                type : 'number',
                min : '1',
                max: '9',
                defaultValue : '1'
            }} />
            <button>Add to cart</button>
            {!amountIsValid && <p>Enter Number Between 1 and 9</p>}
        </form>
    )
}

export default MealItemForm