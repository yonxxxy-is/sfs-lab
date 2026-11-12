import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import { button, heading, body } from "./tokens";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
    
    // Store error details in state for display
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-5">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="size-8 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
            <h1 className={`mt-6 text-2xl font-bold ${heading}`}>Something went wrong</h1>
            <p className={`mt-3 text-sm ${body}`}>
              We encountered an unexpected error. The development team has been notified.
            </p>
            
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-xs dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer font-semibold">Error Details (Development Only)</summary>
                <pre className="mt-2 overflow-auto text-red-600 dark:text-red-400">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button onClick={this.handleReset} className={button("primary")}>
                Return to Home
              </button>
              <button onClick={() => window.location.reload()} className={button("secondary")}>
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
