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

const queryClient = new QueryClient();

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x1RHxbf1x1ZFNMYFhbRndPMyBoS35Rc0ViWX5ednRRRWBeU0Z0"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
