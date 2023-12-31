import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const CustomToaster = () => (
  <Toaster
    position="top-right"
    containerStyle={{
      top: 100,
      right: 20,
    }}
    toastOptions={{
      style: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomToaster />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
