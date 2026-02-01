import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, X, BookOpen } from "lucide-react";

type HeaderProps = {
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({ center, right }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Active styles using your primary brand color
  const activeLinkStyles = {
    className:
      "flex items-center gap-3 p-3 mb-2 rounded-xl transition-colors bg-primary text-white",
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className="py-2 sm:py-3 shadow-sm border-b sticky top-0 z-40 bg-white"
        style={{ borderColor: "var(--white-soft)" }}>
        <div className="container flex items-center px-3 sm:px-4">
          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="p-1.5 sm:p-2 rounded-lg transition-colors hover:bg-gray-100"
              aria-label="Open menu">
              <Menu size={20} className="sm:w-6 sm:h-6" />
            </button>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <img
                src="/web-app-manifest-192x192.png"
                alt="NextGrades Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                NextGrades
              </span>
            </Link>
          </div>

          {/* CENTER SLOT */}
          <div className="flex-1 flex justify-center px-2 sm:px-4 min-w-0">
            {center}
          </div>

          {/* RIGHT SLOT */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {right}
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
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className="flex items-center justify-between p-4 sm:p-5 border-b"
          style={{ borderColor: "var(--white-soft)" }}>
          <img
            src="/web-app-manifest-192x192.png"
            alt="NextGrades Logo"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          {/* Home Link */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
            activeProps={activeLinkStyles}>
            <Home size={18} className="sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">
              Dashboard
            </span>
          </Link>

          {/* Subjects Link */}
          <Link
            to="/lesson/subjects"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2"
            activeProps={activeLinkStyles}>
            <BookOpen size={18} className="sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Courses</span>
          </Link>

          <hr
            className="my-3 sm:my-4"
            style={{ borderColor: "var(--white-soft)" }}
          />
        </nav>

        {/* Optional Footer Section in Sidebar */}
        <div
          className="p-3 sm:p-4 bg-gray-50 border-t"
          style={{ backgroundColor: "var(--surface)" }}>
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            © 2024 Learning App
          </p>
        </div>
      </aside>
    </>
  );
}
