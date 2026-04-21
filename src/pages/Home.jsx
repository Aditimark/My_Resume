import Navbar from "../components/Navbar";

export default function Home({ user, goToLogin, goToChat }) {
  const handleChatClick = () => {
    if (user) {
      goToChat();
    } else {
      goToLogin();
    }
  };

  return (
    <>
      <Navbar user={user} />

      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Aditi Markande
        </h1>

        <p className="mt-4">
          Configuration Analyst | Full Stack Developer
        </p>

        <a
          href="/resume.pdf"
          target="_blank"
          className="block mt-4 text-blue-600 underline"
        >
          View Resume
        </a>

        <button
          onClick={handleChatClick}
          className="mt-6 bg-blue-500 text-white px-4 py-2"
        >
          Chat with me
        </button>
      </div>
    </>
  );
}