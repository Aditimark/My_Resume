export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border p-6">
        <h2 className="text-xl mb-4">Login</h2>

        <input placeholder="Email" className="border block mb-2" />
        <input placeholder="Password" type="password" className="border block mb-2" />

        <button className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </div>
    </div>
  );
}