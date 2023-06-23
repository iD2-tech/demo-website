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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section id="home">{location.pathname === '/' && <Home />}</section>
        <section id="order" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {location.pathname === '/' && <Order />}
        </section>
        <section id="aboutus">{location.pathname === '/' && <AboutUs />}</section>
      </main>
    </div>
  );
};

export default Layout;
