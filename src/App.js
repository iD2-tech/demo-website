import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import AboutUs from "./pages/AboutUs/AboutUs";
import VisitUs from "./pages/VisitUs/VisitUs";
import Success from "./pages/Success/Success";

function App() {

    // all colors will be set in variable.scss as secondary, primary, text, etc..
    // never use individual colors in css file

    return (
        <Layout>
            {/* Global state will go here (JSON)
            https://stackoverflow.com/questions/69675357/what-is-the-proper-way-to-do-global-state */}
            <Routes>
                <Route path="/" exact element={<Home />} />
                {/* <Route path="/order" exact element={<Order />} /> */}
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/aboutus" exact element={<AboutUs />} />
                <Route path="/visitus" exact element={<VisitUs />} />
                <Route path="/order/success" exact element={<Success />} />
            </Routes>
        </Layout>
    );
}

export default App;