import {
  Mail,
  GraduationCap,
  Code,
  MapPin,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://avatars.githubusercontent.com/prince-jha-02"
            alt="Prince Kumar Jha"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold">Prince Kumar Jha</h1>
            <p className="text-lg mt-2 text-blue-100">
              Final Year B.Tech Computer Science & Engineering Student
            </p>
            <p className="mt-4 text-blue-50 leading-7 max-w-3xl">
              I'm a passionate Full Stack Developer specializing in the MERN
              stack with a strong interest in building scalable web applications
              and solving real-world problems. I enjoy creating products that
              improve productivity, automate repetitive tasks, and provide an
              excellent user experience.
            </p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600 leading-8">
              Hi! I'm <strong>Prince Kumar Jha</strong>, a final-year B.Tech
              Computer Science and Engineering student at
              <strong> Galgotias University</strong>.
              <br />
              <br />
              I enjoy designing and developing full-stack applications using the
              MERN stack. Alongside development, I actively practice Data
              Structures & Algorithms to strengthen my problem-solving skills.
              <br />
              <br />
              Job Tracker is one of my major personal projects, created to help
              students and professionals organize job applications, schedule
              interviews, visualize application analytics, and simplify their
              job search through a Chrome Extension and a modern dashboard.
              <br />
              <br />
              I'm always excited to learn new technologies, collaborate with
              developers, and build software that solves meaningful problems.
            </p>
          </div>

          {/* Project */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="text-gray-600 leading-8">
              Job Tracker is a complete job application management platform built
              using the MERN Stack. It enables users to:
            </p>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>✅ Track job applications</li>
              <li>✅ Schedule interviews and assessments</li>
              <li>✅ View analytics and application statistics</li>
              <li>✅ Manage notes and tags</li>
              <li>✅ Save jobs quickly using a Chrome Extension</li>
              <li>✅ Search, filter and organize applications efficiently</li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-5">Quick Info</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-blue-600" />
                <span>Final Year B.Tech CSE</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-600" />
                <span>Galgotias University</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="text-blue-600" />
                <span>MERN Stack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-5">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "JavaScript",
                "Tailwind CSS",
                "C++",
                "DSA",
                "Chrome Extension",
                "REST API",
                "JWT",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-5">Connect With Me</h2>
            <div className="space-y-4">
              <a
                href="https://github.com/prince-jha-02"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {/* Replaced with react-icons */}
                  <FaGithub size={24} />
                  <span>GitHub</span>
                </div>
                <ExternalLink size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/prince-jha-411722278/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {/* Replaced with react-icons */}
                  <FaLinkedin size={24} className="text-blue-600" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink size={18} />
              </a>

              <a
                href="mailto:jhaprince99104@gmail.com"
                className="flex items-center justify-between p-3 rounded-xl border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <Mail className="text-red-500" />
                  <span>Email</span>
                </div>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;