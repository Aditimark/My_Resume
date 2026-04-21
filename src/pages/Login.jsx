import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login({ goToChat }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Signup successful! Now login.");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else if (goToChat) goToChat();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border p-6 w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border block mb-2 w-full p-2"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border block mb-2 w-full p-2"
        />

        <button
          onClick={signIn}
          className="bg-blue-500 text-white px-4 py-2 w-full mb-2"
        >
          Login
        </button>

        <button
          onClick={signUp}
          className="bg-gray-500 text-white px-4 py-2 w-full"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}