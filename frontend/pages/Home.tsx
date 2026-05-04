import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/mineralClassification");
  };

  return (
    <div className="home-main">
      <div className="space-gradient" />
      <div className="star-field star-field-near" />
      <div className="star-field star-field-mid" />
      <div className="star-field star-field-far" />
      <div className="nebula nebula-left" />
      <div className="nebula nebula-right" />

      <section className="hero-content">
        <p className="eyebrow">Precision AI for Planetary Data</p>
        <h1>Turn Spectral Imagery into Confident Mineral Insights</h1>
        <p className="hero-description">
          HYPERSPECTRA blends machine learning and planetary science workflows
          to detect mineral signatures from hyperspectral inputs in seconds.
          Upload your data, visualize patterns, and extract decision-ready
          results for exploration and research.
        </p>

        <div className="hero-highlights">
          <span>Fast Mineral Detection</span>
          <span>Immersive Spectral Visualization</span>
          <span>Built for Research Teams</span>
        </div>

        <button className="button-85" onClick={handleGetStarted}>
          Start Mineral Classification
        </button>
      </section>
    </div>
  );
};

export default Home;
