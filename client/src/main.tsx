import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./stores/useAuthStore.tsx";
import AuthProvider  from "./AuthProvider/adminprovider.tsx";
createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
