import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
          </Routes>
        </Main>
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App
