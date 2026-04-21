import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && <Home />}
      {page === "login" && <Login />}
      {page === "chat" && <ChatPage />}

      {/* TEMP navigation buttons */}
      <div className="fixed bottom-4 left-4 space-x-2">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("chat")}>Chat</button>
      </div>
    </div>
  );
}

export default App;