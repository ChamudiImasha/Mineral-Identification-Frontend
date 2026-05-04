import { useState } from "react";
import ImageUploader from "./component/ImageUploader";
import ResultDetailsPanel from "./component/ResultDetailsPanel";
import PlanetMineralGlobe from "./component/Planetmineralglobe";
import "./MineralClassification.css";
// import MineralResultsDisplay from "./component/MineralResultsDisplay";

export default function MineralClassification() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("min_area", "50");
      formData.append("return_image", "true");

      // Call your backend API
      const apiUrl = import.meta.env.VITE_API_URL || "https://mineral-identification-backend-production.up.railway.app";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle specific error responses from backend
        const errorData = await response.json();
        console.error("[MineralClassification] API error:", errorData);

        if (errorData.detail) {
          // Backend returned a structured error (e.g., image rejection)
          setError(errorData.detail);
        } else {
          setError({
            error: "Inference failed",
            reason: `Server returned status ${response.status}`,
            suggestion:
              "Please try again or contact support if the issue persists.",
          });
        }
        return;
      }

      const data = await response.json();
      console.log("[MineralClassification] inference response:", data);
      // Normalize backend response: if the backend returns the class distribution array
      // directly, wrap it under statistics.class_distribution so the rest of the UI
      // (which expects results.statistics.class_distribution) works unchanged.
      if (Array.isArray(data)) {
        setResults({ statistics: { class_distribution: data } });
      } else if (data && Array.isArray(data.statistics?.class_distribution)) {
        setResults(data);
      } else if (data && Array.isArray(data.class_distribution)) {
        // sometimes the backend may return a top-level class_distribution
        setResults({
          statistics: { class_distribution: data.class_distribution },
        });
      } else {
        // fallback: set raw data and let PlanetMineralGlobe attempt normalization
        setResults(data);
      }
    } catch (error) {
      console.error("Error during inference:", error);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      setError({
        error: "Network error",
        reason: "Failed to connect to the backend server",
        suggestion: `Make sure the backend server is running on ${apiUrl}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mineral-page-wrapper">
      <div className="mineral-page-container">
        <div className="mineral-content-wrapper">
          {/* Header */}
          <div className="mineral-header">
            <div className="mineral-header-content">
              <div className="mineral-header-text">
                <h1>Mineral Classification</h1>
                <p>AI-powered CRISM hyperspectral mineral analysis</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="mineral-grid">
            {/* Error Display */}
            {error && (
              <div
                className="error-alert"
                style={{ gridColumn: "1 / -1", marginBottom: 12 }}
              >
                <div className="error-alert-header">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ width: 24, height: 24 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3>{error.error || "Error"}</h3>
                </div>
                <div className="error-alert-body">
                  {error.suggestion && (
                    <p className="error-suggestion">
                      <strong>Suggestion:</strong> {error.suggestion}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="error-dismiss"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="mineral-card">
              <div className="mineral-card-header">
                <h2>Image Upload</h2>
              </div>
              <ImageUploader onImageUpload={handleImageUpload} loading={loading} />
            </div>

            <div className="mineral-card">
              <div className="mineral-card-header">
                <h2>Classification Results</h2>
              </div>
              <ResultDetailsPanel results={results} loading={loading} />
            </div>

            {/* Planet globe full-width below upload/results */}
            <div
              className="mineral-card"
              style={{ minHeight: 640, gridColumn: "1 / -1" }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <PlanetMineralGlobe
                  results={
                    Array.isArray(results)
                      ? results
                      : (results?.statistics?.class_distribution ??
                        results?.class_distribution ??
                        null)
                  }
                  onResults={(data: any) => {
                    setResults(data);
                  }}
                  onUploadState={(b: boolean) => setLoading(b)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
