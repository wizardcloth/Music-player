import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/homepage.tsx";
import AuthCallback from "./pages/authCallback/authCallback.tsx";
import MainLayout from "./pages/mainLayout/mainLayout.tsx";
import ChatPage from "./pages/chatPage/chatPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/authcallback" element={<AuthCallback />} />
      <Route  element={<MainLayout/>}>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<ChatPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
