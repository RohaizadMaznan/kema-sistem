import React from "react";
import fire from "../../auth/fbAuth";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export default function CouponTable({ title, body, id }) {
  const { addToast } = useToasts();

  const onDelete = () => {
    const notiId = id;
<<<<<<< HEAD
    if (window.confirm(`Padam : ${title} - [${notiId}]?`)) {
      const db = fire.firestore();
      db.collection("notiificationHistory").doc(notiId).delete();
      const message = `${title} Notifikasi dipadamkan.`;
=======
    if (window.confirm(`Delete : ${title} - [${notiId}]?`)) {
      const db = fire.firestore();
      db.collection("notiificationHistory").doc(notiId).delete();
      const message = `${title} notification removed.`;
>>>>>>> 5cd2aae2fff1a3cc25e570ffca201b61527d9614
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
        <td className="px-4 py-4 hover:text-blue-500 cursor-pointer">
          {title}
        </td>
        <td className="px-4 py-4 hover:text-blue-500 cursor-pointer">{body}</td>
        <td className="px-4 py-4 text-center flex justify-center">
          <span
            className="hover:text-green-600 hover:underline cursor-pointer mx-1"
            title="Edit"
          >
            <Link to={`/admin/manage-notifications/update/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </span>
          <span
            className="hover:text-red-600 hover:underline cursor-pointer mx-1"
<<<<<<< HEAD
            title="Padam"
=======
            title="Permanently delete"
>>>>>>> 5cd2aae2fff1a3cc25e570ffca201b61527d9614
            onClick={onDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </>
  );
}
