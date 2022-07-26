import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/menu" exact element={<Menu />}/>
                <Route path="/order" exact element={<Order />}/>
                <Route path="/cart" exact element={<Cart />}/>
                <Route path="/aboutus" exact element={<AboutUs />}/>
            </Routes>
        </Layout>
    );
}

export default App;