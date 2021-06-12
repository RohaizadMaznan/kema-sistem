import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fire from "../../../auth/fbAuth";
import Avatar from "../bendahari/Avatar";

export default function Header() {
  const [top, setTop] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-10 top-0 bg-white ${
        !top && "bg-white blur shadow-lg"
      }`}
    >
      <div className="w-full mx-auto container flex flex-wrap items-center justify-between mt-0 py-4">
        <div className="pl-4 flex items-center">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#ffd3f4" offset="0%" />
                    <stop stopColor="#ffd3f4" offset="25.871%" />
                    <stop stopColor="#7571f9" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>
          <Link
            className="text-gray-900 no-underline hover:no-underline font-extrabold text-xl"
            to="/bendahari/coupon"
          >
            Dashboard Bendahari
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-blue-500 appearance-none focus:outline-none"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className="w-full flex-grow lg:flex  lg:content-center lg:items-center lg:w-auto hidden mt-2 lg:mt-0 z-20"
          id="nav-content"
        >
          <div className="flex-1 w-full mx-auto max-w-sm content-center py-4 lg:py-0"></div>
          <ul className="list-reset lg:flex justify-end items-center">
            {!loggedIn ? (
              <>
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="/signin"
                    className="text-gray-900 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out hover:bg-gray-200 rounded-md"
                  >
                    Sign in
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Avatar />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
