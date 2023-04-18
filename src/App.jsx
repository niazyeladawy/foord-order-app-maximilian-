import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'

function App() {
  
  const [cartIsShown, setCartIsShown] = useState(false);

  const handleShowCart = ()=>{
    setCartIsShown(true)
  }

  const handleHideCart = ()=>{
    setCartIsShown(false)
  }

  return (
    <>
      {cartIsShown &&   <Cart onHideCart={handleHideCart} />}
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals />
      </main>
    </>
  )
}

export default App
