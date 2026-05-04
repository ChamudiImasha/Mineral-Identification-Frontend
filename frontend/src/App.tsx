import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../pages/component/Header";
import ExoDetect from "../pages/ExoDetection";
import ExtraMineral from "../pages/ExtraMineral";
import AtmosProfile from "../pages/AtmosProfile";
import StellarAnalysis from "../pages/StellarAnalysis";
import MineralClassification from "../pages/MineralClassification";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exoplanetDetection" element={<ExoDetect />} />
        <Route path="/extraMineral" element={<ExtraMineral />} />
        <Route path="/atmosphereProfile" element={<AtmosProfile />} />
        <Route path="/stellarAnalysis" element={<StellarAnalysis />} />
        <Route
          path="/mineralClassification"
          element={<MineralClassification />}
        />
      </Routes>
    </Router>
  );
}

export default App;
