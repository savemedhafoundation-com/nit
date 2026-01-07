import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import nitLogoGreen from "../assets/photo/NIT final.png";
import nitLogoWhite from "../assets/photo/NIT white.png";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMapPin, FiMenu, FiSearch, FiX } from "react-icons/fi";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT NIT", path: "/about" },
  { label: "OUR THERAPIES", path: "/diseases", caret: true },
  { label: "WHY CHOOSE NIT", path: "/boosters" },
  {
    label: "SYMPTOM CHECKER",
    path: "/symptom-checker",
    caret: true,
    children: [{ label: "REPORT EXPLAINER", path: "/upload-report" }],
  },
  { label: "BLOG", path: "/blog" },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 md:hidden">
      <div className="relative bg-gradient-to-r from-[#54E040] to-[#002902]">
        <div className="relative mx-auto flex h-12 items-center justify-between px-3">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-full w-44 -translate-x-1/2 bg-white [clip-path:polygon(0_0,86%_0,100%_50%,86%_100%,0_100%)]"
            aria-hidden="true"
          />

          <button
            type="button"
            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0a7c1b] shadow-sm"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <FiMenu className="h-4 w-4" />
          </button>

          <Link to="/" className="relative z-10" aria-label="Go to homepage">
            <img
              src={nitLogoGreen}
              onError={(event) => {
                event.currentTarget.src = nitLogoWhite;
              }}
              alt="Natural Immunotherapy logo"
              className="h-7 w-auto object-contain select-none"
              draggable="false"
            />
          </Link>

          <div className="relative z-10 flex items-center gap-3 text-white">
            <button
              type="button"
              className="text-white/90 transition hover:text-white"
              aria-label="Search"
            >
              <FiSearch className="h-4 w-4" />
            </button>
            <a
              href="tel:+919800808595"
              className="text-white/90 transition hover:text-white"
              aria-label="Call"
            >
              <FaPhoneAlt className="h-4 w-4" />
            </a>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0a7c1b] shadow-sm"
              aria-label="Location"
            >
              <FiMapPin className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-64 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile menu"
        >
          <div className="relative h-full w-full overflow-hidden rounded-r-2xl shadow-[0_16px_32px_rgba(0,0,0,0.25)]">
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#54E040] to-[#002902] [clip-path:polygon(0_0,100%_0,100%_59%,49%_44%,0_59%)]"
              aria-hidden="true"
            />

            <button
              type="button"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#0a7c1b] shadow-sm"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <FiX className="h-4 w-4" />
            </button>

            <nav className="relative mt-12 space-y-2 px-5 pb-12 font-inter">
              {navItems.map((item) => (
                <div key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide",
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/95 hover:bg-white/10",
                      ].join(" ")
                    }
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    {item.caret ? (
                      <svg
                        className="h-3 w-3 text-current"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 4.5 6 7.5 9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </NavLink>

                </div>
              ))}

            </nav>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default MobileNavbar;
