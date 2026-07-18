import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2 text-white uppercase">Fatal Node Error</h1>
          <p className="text-white/50 max-w-md mb-8">
            The autonomous engine encountered an unexpected error. Please re-initialize the session.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary px-8 py-3 rounded-xl font-black uppercase text-xs"
          >
            Re-Initialize Node
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
