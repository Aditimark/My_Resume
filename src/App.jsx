import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const fetchRole = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (!error && data) {
    setRole(data.role);
  } else {
    setRole("user");
  }
};
  useEffect(() => {
  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    if (currentUser) fetchRole(currentUser.id);
  });

  // Listen for changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      fetchRole(currentUser.id);
    } else {
      setRole("user");
    }
  });

  return () => subscription.unsubscribe();
}, []); 

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            user={user}
            role={role}
            goToLogin={() => navigate("/login")}
            goToChat={() => navigate("/chat")}
          />
        }
      />

      <Route
  path="/login"
  element={
    user ? <Navigate to="/chat" /> : <Login />
  }
/>

      <Route
        path="/chat"
        element={
          <ProtectedRoute user={user}>
            <ChatPage user={user} role={role} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          user && role === "admin" ? (
            <AdminPage user={user} role={role} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;