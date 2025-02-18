import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/homepage.tsx";
import AuthCallback from "./pages/authCallback/authCallback.tsx";
import MainLayout from "./pages/mainLayout/mainLayout.tsx";
import ChatPage from "./pages/chatPage/chatPage.tsx";
import AlbumPage from "./pages/albumPage/albumPage.tsx";

function App() {
  return (
      <Routes>
        <Route path="/authcallback" element={<AuthCallback />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
  );
}

export default App;
