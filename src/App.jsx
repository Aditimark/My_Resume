import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

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

  // If user tries to access chat without login
  if (!user && page === "chat") {
    return <Login goToChat={() => setPage("chat")} />;
  }

  if (page === "home") {
  return (
    <Home
      user={user}
      goToLogin={() => setPage("login")}
      goToChat={() => setPage("chat")}
    />
  );
}

  if (page === "login") {
    return <Login goToChat={() => setPage("chat")} />;
  }

  if (page === "chat" && user) {
    return (
      <ChatPage
        user={user}
        goHome={() => setPage("home")}
      />
    );
  }

  return <Home goToLogin={() => setPage("login")} />;
}

export default App;