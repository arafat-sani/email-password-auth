import React from 'react'
import { Navbar } from './../components/Navbar/Navbar';
import { Home } from '../components/Home/Home';
import { Outlet } from 'react-router';
import { Footer } from '../components/Footer/Footer';


export function Root() {
  return (
    <div>
      <Navbar />
      
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

