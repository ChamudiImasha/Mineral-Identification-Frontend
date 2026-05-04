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
      <div className="planet planet-one" />
      <div className="planet planet-two" />
      <div className="nebula nebula-left" />
      <div className="nebula nebula-right" />

      <section className="hero-content">
        <p className="eyebrow">AI + Planetary Spectroscopy</p>
        <h1>Discover Mineral Signatures Across Alien Worlds</h1>
        <p className="hero-description">
          ExoSynergy combines machine learning with astrophysics workflows to
          classify minerals from hyperspectral imagery and surface composition
          clues. Explore simulation tools, analyze spectral responses, and
          accelerate planetary discovery.
        </p>

        <div className="hero-highlights">
          <span>Hyperspectral Classification</span>
          <span>Interactive Planet Visualization</span>
          <span>Research-Ready Workflow</span>
        </div>

        <button className="button-85" onClick={handleGetStarted}>
          Start Mineral Classification
        </button>
      </section>
    </div>
  );
};

export default Home;
