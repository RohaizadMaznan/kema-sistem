import React from "react";
import { Link, useHistory } from "react-router-dom";

function Sidebar() {
  const currentRoute = useHistory().location.pathname.toLowerCase();

  return (
    <div
      className="w-full text-xl text-gray-800 leading-normal z-0"
      data-aos="fade-up"
    >
      <div className="block lg:hidden sticky inset-0">
        <button
          id="menu-toggle"
          className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-blue-500 appearance-none focus:outline-none"
        >
          <svg
            className="fill-current h-3 float-right"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
      <div
        className="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-0"
        style={{ top: "5em" }}
        id="menu-content"
      >
        <ul className="list-reset">
          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/bendahari/profile"
              className={`block pl-4 align-middle text-gray-700 no-underline border-l-4 border-transparent ${
                currentRoute.includes("/bendahari/profile")
                  ? "lg:border-blue-500 font-bold"
                  : " "
              }`}
            >
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-cover mr-3">
                  <img
                    src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                    className="rounded-full h-full w-full overflow-hidden shadow"
                    alt="Profile"
                  />
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm text-gray-900">
                    Profil (Bendahari)
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/bendahari/coupon"
              className={`block px-5 py-2 align-middle text-gray-900 no-underline hover:text-blue-500 rounded-md ${
                currentRoute.includes("/bendahari/coupon")
                  ? "bg-blue-100 text-blue-700"
                  : " "
              }`}
            >
              <div className="flex justify-start">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm">
                    Senarai Kupon
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/bendahari/transaction"
              className={`block px-5 py-2 align-middle text-gray-900 no-underline hover:text-blue-500 rounded-md ${
                currentRoute.includes("/bendahari/transaction")
                  ? "bg-blue-100 text-blue-700"
                  : " "
              }`}
            >
              <div className="flex justify-start">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm">
                    Mengurus Transaksi
                  </span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
