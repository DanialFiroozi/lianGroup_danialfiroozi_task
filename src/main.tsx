import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queries.ts";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            duration: 2000,
            style: {
              maxWidth: "550px",
              color: "#000",
              fontSize: "14px",
              fontWeight: "500",
              padding: "12px",
            },
            error: {
              className: "toast-error",
            },
            success: {
              className: "toast-success",
            },
          }}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
