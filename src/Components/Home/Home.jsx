import React from 'react'
import Header from './Layout/Header'
import Range from './2-ci-hisse/Range'
import Cart from './Carts/Cart'
import { Otaq } from './3-cu-hisse/Otaq'
import Son from './4-cu-hisse/Son'
import Footer from './Footer/Footer.jsx'
import { Hero } from './Hero/Hero.jsx'


export const Home = () => {
  return (
    <div className='w-[1440px] h-[4835px] rotate-0 opacity-100'>
        <Header/>
        <Hero/>
        <Range/>
        <Cart/>
        <Otaq/>
        <Son/>
        <Footer/>
    </div>
  )
}
