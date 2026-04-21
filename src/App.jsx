import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Wrapper components (keep logic clean)
  function HomeWrapper() {
    return (
      <Home
        user={user}
        goToLogin={() => navigate("/login")}
        goToChat={() => navigate("/chat")}
      />
    );
  }

  function LoginWrapper() {
    return (
      <Login goToChat={() => navigate("/chat")} />
    );
  }

  function ChatWrapper() {
    if (!user) return <Navigate to="/login" />;

    return (
      <ChatPage
        user={user}
        goHome={() => navigate("/")}
      />
    );
  }

  

return (
  <Routes>
    <Route
      path="/"
      element={
        <Home
          user={user}
          goToLogin={() => navigate("/login")}
          goToChat={() => navigate("/chat")}
        />
      }
    />

    <Route
      path="/login"
      element={<Login goToChat={() => navigate("/chat")} />}
    />

    <Route
      path="/chat"
      element={
        <ProtectedRoute user={user}>
          <ChatPage
            user={user}
            goHome={() => navigate("/")}
          />
        </ProtectedRoute>
      }
    />
  </Routes>
);
}

export default App;