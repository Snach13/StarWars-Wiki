import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import Characters from "./pages/Characters";
import Planets from "./pages/Planets";
import Starships from "./pages/Starships";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/starships" element={<Starships />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
