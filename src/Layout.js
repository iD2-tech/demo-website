import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Order from "./pages/Order";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <main>
        <section id="home">{location.pathname === '/' && <Home />}</section>
        <section id="order">{location.pathname === '/' && <Order />}</section>
        <section id="aboutus">{location.pathname === '/' && <AboutUs />}</section>
      </main>
    </div>
  );
};

export default Layout;