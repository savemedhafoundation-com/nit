import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen && !isSearchOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isSearchOpen]);

  const closeMenu = () => setIsOpen(false);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const openSearch = () => {
    setIsOpen(false);
    setIsSearchOpen(true);
  };

  useEffect(() => {
    if (!isSearchOpen) return undefined;
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  const searchableRoutes = useMemo(
    () => [
      ...navItems.flatMap((item) => {
        const flattened = [{ label: item.label, path: item.path }];
        if (item.children?.length) {
          flattened.push(
            ...item.children.map((child) => ({
              label: child.label,
              path: child.path,
              parent: item.label,
            }))
          );
        }
        return flattened;
      }),
      { label: "CONNECT & SUPPORT", path: "/contact" },
    ],
    []
  );

  const filteredRoutes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchableRoutes;

    return searchableRoutes.filter((route) => {
      const label = route.label.toLowerCase();
      const parent = route.parent?.toLowerCase() ?? "";
      return label.includes(query) || parent.includes(query);
    });
  }, [searchQuery, searchableRoutes]);

  return (
    <header className="sticky top-0 z-40 md:hidden">
      <div className="relative bg-gradient-to-r from-[#54E040] to-[#002902]">
        <div className="relative mx-auto flex h-12 items-center justify-between px-3">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 bg-white [clip-path:polygon(0_0,86%_0,100%_50%,86%_100%,0_100%)]"
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

          <Link to="/" className="relative z-10 " aria-label="Go to homepage">
            <img
              src={nitLogoGreen}
              onError={(event) => {
                event.currentTarget.src = nitLogoWhite;
              }}
              alt="Natural Immunotherapy logo"
              className="h-7 w-auto object-contain select-none "
              draggable="false"
            />
          </Link>

          <div className="relative z-10 flex items-center gap-3 text-white">
            <button
              type="button"
              className="text-white/90 transition hover:text-white"
              aria-label="Search"
              onClick={openSearch}
              aria-haspopup="dialog"
              aria-expanded={isSearchOpen}
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
        className={`fixed inset-0 z-[60] md:hidden ${
          isSearchOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isSearchOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
            isSearchOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSearch}
        />

        <div
          className={`absolute left-0 top-0 w-full transition-transform duration-300 ease-in-out ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-auto w-full max-w-[520px] px-3 pt-3">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#54E040] to-[#002902] shadow-[0_18px_36px_rgba(0,0,0,0.25)]">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white">
                    <FiSearch className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        closeSearch();
                        return;
                      }
                      if (event.key !== "Enter") return;

                      const firstMatch = filteredRoutes[0];
                      if (!firstMatch) return;
                      closeSearch();
                      navigate(firstMatch.path);
                    }}
                    placeholder="Search pages..."
                    className="h-10 w-full flex-1 rounded-full bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm outline-none ring-0 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/60"
                    aria-label="Search pages"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a7c1b] shadow-sm"
                    aria-label="Close search"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-[0_14px_28px_rgba(2,25,6,0.22)]">
                  {filteredRoutes.length ? (
                    <ul className="max-h-[60vh] overflow-y-auto">
                      {filteredRoutes.map((route) => (
                        <li key={`${route.path}-${route.label}`}>
                          <Link
                            to={route.path}
                            onClick={closeSearch}
                            className="flex items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-[#eef9f1]"
                          >
                            <div className="min-w-0">
                              <div className="truncate text-[12px] font-bold uppercase tracking-[0.18em] text-[#0a7c1b]">
                                {route.label}
                              </div>
                              {route.parent ? (
                                <div className="mt-1 truncate text-[11px] font-semibold text-slate-500">
                                  {route.parent}
                                </div>
                              ) : null}
                            </div>
                            <svg
                              className="h-4 w-4 shrink-0 text-slate-400"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path
                                d="M7.5 4.5 12.5 10 7.5 15.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm font-semibold text-slate-500">
                      No matching pages.
                    </div>
                  )}
                </div>
              </div>
            </div>
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
          <div className="relative h-full w-full overflow-hidden rounded-r-2xl ">
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#54E040] to-[#002902] [clip-path:polygon(0_0,99%_0,99%_50%,49%_40%,0_50%)]"
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
