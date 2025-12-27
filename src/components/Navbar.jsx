import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import nitLogoGreen from "../assets/photo/NIT final.png";
import nitLogoWhite from "../assets/photo/NIT white.png";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  const renderCaret = () => (
    <svg
      className="h-2.5 w-2.5 text-slate-700 transition group-hover:text-primary-500"
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
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80">
      <div className="h-10 w-full bg-gradient-to-r from-[#54E040] to-[#002902] ">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-5 gap-16 text-base font-semibold sm:px-10 lg:px-0 text-white  font-semibold text-sm">
          {/* Email */}
          <a
            href="mailto:info@medhaclinic.com"
            className="flex items-center gap-2 hover:text-white/90 transition"
          >
            <MdEmail className="text-[15px]" />
            <span>info@medhaclinic.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+919800808595"
            className="flex items-center gap-2 hover:text-white/90 transition"
          >
            <FaPhoneAlt className="text-[13px]" />
            <span>+91 98008 08595</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-10 lg:px-0">
        <img
          src={nitLogoGreen}
          onError={(event) => {
            event.currentTarget.src = nitLogoWhite;
          }}
          alt="Natural Immunotherapy logo"
          className="h-14 w-auto object-contain select-none"
          draggable="false"
        />

        <nav className="hidden items-center gap-6 font-inter md:flex">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <NavLink
                to={item.path}
                // className={({ isActive }) =>
                //   [
                //     "flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold uppercase transition-colors",
                //     item.highlight
                //       ? "rounded-md bg-gradient-to-b from-[#18b82d] to-[#0a8f1d] px-3 py-2 text-white shadow-[0_10px_18px_rgba(14,118,36,0.28)]"
                //       : isActive
                //       ? "text-[#0a7c1b]"
                //       : "text-slate-800 hover:text-[#0a7c1b]",
                //   ].join(" ")
                // }
                className={({ isActive }) =>
                  [
                    "flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold uppercase transition-colors",
                    isActive
                      ? "text-[#0a7c1b]"
                      : "text-slate-800 hover:text-[#0a7c1b]",
                  ].join(" ")
                }
                onClick={closeMenu}
              >
                {item.label}
                {/* {item.caret && !item.highlight && renderCaret()}
                {item.caret && item.highlight && (
                  <svg
                    className="h-2.5 w-2.5 text-white/90"
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
                )} */}
                {item.caret && renderCaret()}
              </NavLink>

              {item.children?.length ? (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="rounded-xl overflow-hidden ">
                  <div
                    className="
        min-w-[180px]
        min-h-[160px]
        bg-gradient-to-b from-[#54E040] to-[#002902]
        py-5
        text-center
        text-[14px]
        font-semibold
        uppercase
        text-white
        shadow-[0_12px_24px_rgba(14,118,36,0.35)]
      "
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 59%, 49% 44%, 0 59%)",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-5 py-2 hover:bg-white/15 transition"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>


        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/contact"
            className="relative inline-flex items-center gap-3 whitespace-nowrap rounded-md px-6 py-2 text-xs font-semibold uppercase text-white"
          >
            <span
              className="absolute -left-3 -top-6 h-20 w-[565px]   bg-gradient-to-r
    from-[#21CE06]
    via-[#119605]
    to-[#005505]"
              // style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
              style={{clipPath: "polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%)"}}
              aria-hidden="true"
            />
            <span className="z-10 px-8 font-bold">Connect & Support</span>
            <MdContactPhone className="absolute left-48 min-h-7 min-w-7 text-white z-10" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-[#0a8f1d] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#077b18] focus:outline-none focus:ring-2 focus:ring-[#62cf71] md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <nav className="space-y-1 border-t border-[#0d7120]/20 bg-white px-4 py-4 font-inter">
            {navItems.map((item) => (
              <div key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold uppercase",
                      item.highlight
                        ? "bg-[#18b82d] text-white"
                        : isActive
                        ? "bg-[#e6f6ea] text-[#0a7c1b]"
                        : "text-slate-700 hover:bg-[#eef9f1] hover:text-[#0a7c1b]",
                    ].join(" ")
                  }
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  {item.caret && renderCaret()}
                </NavLink>
                {item.children?.length ? (
                  <div className="mt-1 space-y-1 pl-3">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          [
                            "flex items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase",
                            isActive
                              ? "bg-[#e6f6ea] text-[#0a7c1b]"
                              : "text-slate-700 hover:bg-[#eef9f1] hover:text-[#0a7c1b]",
                          ].join(" ")
                        }
                        onClick={closeMenu}
                      >
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-between rounded-md bg-[#0a8f1d] px-3 py-2 text-base font-semibold uppercase text-white shadow hover:bg-[#077b18] font-montserrat"
            >
              <span>Connect & Support</span>
              <svg
                className="h-4 w-4 text-accent"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="m6 3 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
