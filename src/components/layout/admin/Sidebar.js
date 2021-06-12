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
              to="/admin/profile"
              className={`block pl-4 align-middle text-gray-700 no-underline border-l-4 border-transparent ${
                currentRoute.includes("/admin/profile")
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
                    Profil (Pentadbir)
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/admin/manage-users"
              className={`block px-5 py-2 align-middle text-gray-900 no-underline hover:bg-blue-100 hover:text-blue-500 rounded-md ${
                currentRoute.includes("/admin/manage-users")
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm">
                    Mengurus Pengguna
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/admin/manage-reports"
              className={`block px-5 py-2 align-middle text-gray-900 no-underline hover:bg-blue-100 hover:text-blue-500 rounded-md ${
                currentRoute.includes("/admin/manage-reports")
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
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm">Mengurus Laporan</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="py-2 md:my-0 hover:bg-blue-100 lg:hover:bg-transparent">
            <Link
              to="/admin/manage-notifications"
              className={`block px-5 py-2 align-middle text-gray-900 no-underline hover:bg-blue-100 hover:text-blue-500 rounded-md ${
                currentRoute.includes("/admin/manage-notifications")
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <span className="pb-1 md:pb-0 text-sm">
                    Mengurus Notifikasi
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
