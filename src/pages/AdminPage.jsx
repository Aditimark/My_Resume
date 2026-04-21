import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function AdminPage({ user, role }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [userMap, setUserMap] = useState({}); // id → email map

  useEffect(() => {
    loadUsers();
  }, []);

  // -------------------------
  // LOAD USERS (EMAIL FIXED)
  // -------------------------
  const loadUsers = async () => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("user_id");

  if (error) {
    console.error(error);
    return;
  }

  const uniqueIds = [...new Set(messages.map(m => m.user_id))];

  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, role")
    .in("id", uniqueIds);

  if (profileError) {
    console.error(profileError);
    return;
  }

  const map = new Map();

  uniqueIds.forEach(id => {
    const user = profiles.find(p => p.id === id);

    map.set(id, {
      email: user?.email || id,
      role: user?.role || "user"
    });
  });

  setUsers([...map.entries()]);
  setUserMap(Object.fromEntries(map));
};

  // -------------------------
  // LOAD MESSAGES
  // -------------------------
  const loadMessages = async (userId) => {
    setSelectedUser(userId);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages:", error);
      return;
    }

    setMessages(data || []);
  };

  // -------------------------
  // SEND REPLY
  // -------------------------
  const sendReply = async () => {
    if (!input.trim() || !selectedUser) return;

    const newMsg = {
      user_id: selectedUser,
      content: input,
      sender: "admin",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    const { error } = await supabase.from("messages").insert([newMsg]);

    if (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  // -------------------------
  // DELETE CHAT
  // -------------------------
  const deleteChat = async () => {
    if (!selectedUser) return;

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("user_id", selectedUser);

    if (error) {
      console.error("Error deleting chat:", error);
      return;
    }

    setMessages([]);
  };

  return (
    <>
      <Navbar user={user} role={role} />

      <div className="flex h-[90vh]">

        {/* LEFT: USERS */}
        <div className="w-1/4 border-r bg-white">
          <h2 className="p-4 font-semibold">Users</h2>

          {users.length === 0 && (
            <p className="p-4 text-sm text-gray-400">
              No users found
            </p>
          )}

          {users.map(([id, user]) => (

  <div

    key={id}

    onClick={() => loadMessages(id)}

    className="p-3 cursor-pointer hover:bg-gray-100"

  >

    {user.email}

  </div>

))}
        </div>

        {/* RIGHT: CHAT */}
        <div className="flex-1 flex flex-col bg-gray-50">

          {/* HEADER */}
          <div className="p-4 bg-white border-b flex justify-between">
            <span>
              {userMap[selectedUser]?.email || selectedUser}
            </span>

            {selectedUser && (
              <button
                onClick={deleteChat}
                className="text-red-500 text-sm"
              >
                Delete Chat
              </button>
            )}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "admin"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === "admin"
                      ? "bg-purple-500 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          {selectedUser && (
            <div className="p-4 bg-white border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border p-2 rounded-full"
                placeholder="Type reply..."
              />

              <button
                onClick={sendReply}
                disabled={!input.trim()}
                className="bg-purple-500 text-white px-4 rounded-full disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}