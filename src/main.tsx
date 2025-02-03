import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext.tsx";
import { registerLicense } from "@syncfusion/ej2-base";
import { QueryClient, QueryClientProvider } from "react-query";
import { FileProvider } from "./FileContext.tsx";

const queryClient = new QueryClient();

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVFpR2Nbek5xdl9CZ1ZQQWYuP1ZhSXxWdkRgWH9edXZRR2ddVEc="
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FileProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </FileProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
