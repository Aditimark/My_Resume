import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function ChatPage({ user, role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
  if (!user) return;

  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        if (payload.new.user_id === user.id) {
          setMessages((prev) => [...prev, payload.new]);
        }
      }
    )
    .subscribe((status) => {
      console.log("Realtime status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);
  useEffect(() => {
  if (user) {
    loadMessages();
  }
}, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      user_id: user.id,
      content: input,
      sender: role === "admin" ? "admin" : "user",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    await supabase.from("messages").insert([newMsg]);
    setInput("");
  };

  const deleteChat = async () => {
    await supabase.from("messages").delete().eq("user_id", user.id);
    setMessages([]);
  };

  return (
    <>
      <Navbar user={user} role={role} />

      <div className="flex flex-col h-[90vh] bg-gray-50">
        <div className="flex justify-between p-4 bg-white border-b">
          <h2>Chat</h2>
          <button onClick={deleteChat} className="text-red-500 text-sm">
            Clear Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "admin"
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.sender === "admin"
                    ? "bg-white border"
                    : "bg-blue-500 text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 bg-white border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-full"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}