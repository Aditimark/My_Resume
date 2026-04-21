export default function ChatPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Chat</h2>

      <div className="border h-80 mb-4 p-2">
        Messages will appear here
      </div>

      <input className="border w-full mb-2" placeholder="Type message..." />
      <button className="bg-green-500 text-white px-4 py-2">
        Send
      </button>
    </div>
  );
}