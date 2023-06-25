import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Order from "./pages/Order";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Routes, Route } from 'react-router-dom/dist';

const App = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Routes>
        <Route path="/cart" exact element={<Cart />}/>
      </Routes>
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

export default App;