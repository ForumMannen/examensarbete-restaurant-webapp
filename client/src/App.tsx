import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kontakt from "./pages/Kontakt";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Kontakt />}/>
            <Route path="/kundvagn" element={<Cart />}/>
          </Routes>
        </Main>
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App
