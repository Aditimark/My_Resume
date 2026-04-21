import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home({ user, role, goToLogin, goToChat }){
  const handleChatClick = () => {
    if (user) goToChat();
    else goToLogin();
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar user={user} role={role} />

      <div className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center py-20 px-6 bg-gradient-to-r from-blue-50 to-white"
        >
          <h1 className="text-5xl font-bold mb-4">
            Aditi Markande
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Configuration Analyst @ Oracle Cerner • Healthcare Systems • Full Stack Developer
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              className="bg-black text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              View Resume
            </a>

            <button
              onClick={handleChatClick}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition"
            >
              Chat with me
            </button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

          {/* ABOUT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">
              Configuration Analyst with 3+ years of experience delivering clinical
              systems across Middle East and UK. Specialized in PathNet, validation,
              and workflow optimization. Known for ownership and building impactful
              internal tools.
            </p>
          </motion.div>

          {/* EXPERIENCE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-6">Experience</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1">
                <h3 className="font-semibold text-lg">
                  Oracle Cerner — Configuration Analyst
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  2023 – Present
                </p>

                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• 350+ Jira tasks (&gt;99% accuracy)</li>
                  <li>• Middle East Go-Live implementations</li>
                  <li>• UK Emergency Department solutions</li>
                  <li>• Client training & validation</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1">
                <h3 className="font-semibold text-lg">
                  System Intern — Oracle
                </h3>
                <p className="text-sm text-gray-500">
                  2023
                </p>
              </div>

            </div>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-6">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "JavaScript",
                "Flutter",
                "SQL",
                "Python",
                "PathNet",
                "Clinical Validation",
                "Jira",
                "GitHub",
              ].map((skill) => (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  key={skill}
                  className="bg-white border px-4 py-2 rounded-full text-sm shadow hover:bg-blue-50"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* PROJECTS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-6">Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  ESH Formatter
                </h3>
                <p className="text-gray-600 text-sm">
                  React tool for build comparison used internally across teams.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  GRM Tool
                </h3>
                <p className="text-gray-600 text-sm">
                  Workflow automation tool using React + SQL.
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* ACHIEVEMENTS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-4">Achievements</h2>

            <ul className="text-gray-600 space-y-2">
              <li>🏆 Consulting Excellence Award – Oracle</li>
              <li>🚀 Innovation Award – ESH Formatter</li>
              <li>👏 Leadership recognition</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </>
  );
}