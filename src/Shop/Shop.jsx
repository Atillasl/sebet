import React from 'react'
import Header from '../Components/Home/Layout/Header'
import HeroShop from './HeroShop/HeroShop'
import ShopProducts from './Shop-main/ShopProduct'
import Footer from '../Components/Home/Footer/Footer'
export const Shop = () => {
  return (
    <div>
        <Header/>
        <HeroShop/>
        <ShopProducts/>
        <Footer/>
    </div>
  )
}
