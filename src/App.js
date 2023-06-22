import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import DisplayMenu from "./pages/DisplayMenu";
import Success from "./pages/Success";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/order/success" exact element={<Success />} />
            </Routes>
        </Layout>
    );
}

export default App;