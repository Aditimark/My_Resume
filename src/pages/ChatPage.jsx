import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ChatPage({ user, goHome }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!user) return;

    loadMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.new.user_id === user.id) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error) setMessages(data);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      user_id: user.id,
      content: input,
      sender: "user",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    await supabase.from("messages").insert([newMsg]);

    setInput("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={goHome}
          className="bg-gray-300 px-3 py-1"
        >
          Home
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }}
          className="bg-red-500 text-white px-3 py-1"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mb-4">Chat</h2>

      <div className="border h-80 overflow-y-scroll mb-4 p-2">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <p key={i}>
              <b>{msg.sender}:</b> {msg.content}
            </p>
          ))
        )}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border w-full mb-2 p-2"
        placeholder="Type message..."
      />

      <button
        onClick={sendMessage}
        className="bg-green-500 text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}