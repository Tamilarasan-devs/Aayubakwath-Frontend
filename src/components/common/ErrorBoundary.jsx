import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#111827] mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 font-medium max-w-md mb-8">
            We&apos;re sorry, but an unexpected error occurred. Please try
            refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#111827] text-white rounded-xl px-8 h-12 text-sm font-semibold uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-8 text-left text-xs text-red-600 bg-red-50 p-4 rounded-xl max-w-2xl w-full overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
