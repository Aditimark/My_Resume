import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b shadow-sm sticky top-0 z-50">
      
      {/* Logo / Name */}
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Aditi Markande
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-5 text-sm">
        
        <button
          onClick={() => navigate("/")}
          className="hover:text-blue-500"
        >
          Home
        </button>

        {user && (
          <button
            onClick={() => navigate("/chat")}
            className="hover:text-blue-500"
          >
            Chat
          </button>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}