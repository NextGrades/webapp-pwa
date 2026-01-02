import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, X, BookOpen } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Active styles using your primary brand color
  const activeLinkStyles = {
    className:
      "flex items-center gap-3 p-3 rounded-xl transition-colors mb-2 text-white",
    style: { backgroundColor: "var(--blue-main)" },
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className="py-3  shadow-sm border-b sticky top-0 z-40 bg-white"
        style={{ borderColor: "var(--white-soft)" }}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"

              aria-label="Open menu">
              <Menu size={24} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src="/web-app-manifest-192x192.png"
                alt="NextGrades Logo"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span
                className="text-xl font-bold tracking-tight"
  >
                NextGrades
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile/Side Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: "var(--white-soft)" }}>
         <img src="/web-app-manifest-192x192.png" alt="NextGrades Logo" className="size-16"/>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Home Link */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
            activeProps={activeLinkStyles}>
            <Home size={20} />
            <span className="font-semibold">Dashboard</span>
          </Link>

          {/* Subjects Link */}
          <Link
            to="/lesson/subjects"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
            activeProps={activeLinkStyles}>
            <BookOpen size={20} />
            <span className="font-semibold">Subjects</span>
          </Link>

          <hr className="my-4" style={{ borderColor: "var(--white-soft)" }} />

          {/* TTS Link */}
          <Link
            to="/text-to-speech"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
            activeProps={activeLinkStyles}>
            <span
              className="w-5 flex justify-center text-xs font-bold border rounded p-0.5"
              style={{ borderColor: "var(--muted)" }}>
              TTS
            </span>
            <span className="font-semibold">Speech Tool</span>
          </Link>
        </nav>

        {/* Optional Footer Section in Sidebar */}
        <div
          className="p-4 bg-gray-50 border-t"
          style={{ backgroundColor: "var(--surface)" }}>
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            © 2024 Learning App
          </p>
        </div>
      </aside>
    </>
  );
}
