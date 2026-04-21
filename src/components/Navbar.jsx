import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, role }) {
  const navigate = useNavigate();

  const logout = async () => {
  await supabase.auth.signOut();
  navigate("/login"); // force route change
};

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b shadow-sm sticky top-0 z-50">

      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Aditi Markande
      </div>

      <div className="flex items-center gap-5 text-sm">
        <button onClick={() => navigate("/")}>Home</button>

        {user && <button onClick={() => navigate("/chat")}>Chat</button>}

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="text-purple-600 font-semibold"
          >
            Admin
          </button>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}