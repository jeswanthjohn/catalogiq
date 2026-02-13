import React from "react";

/**
 * ErrorBoundary
 * --------------
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the entire app.
 *
 * This is critical for production dashboards where analytics or charts
 * may throw runtime errors.
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state so the next render shows fallback UI.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error details (can be extended to send to logging service).
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            padding: "1.5rem",
            margin: "1rem 0",
            border: "1px solid #ff4d4f",
            backgroundColor: "#fff1f0",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem", color: "#cf1322" }}>
            Something went wrong.
          </h2>
          <p style={{ margin: 0 }}>
            This section failed to load. Please refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
