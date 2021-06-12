import React, { useState, useEffect } from "react";
import fire from "../../auth/fbAuth";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import ManageUsersTable from "../../components/admin/UsersTable";

export default function MyUpload() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get document users from firestore based on user.uid
      fire.firestore().collection("User").doc(user.uid).get();

      setUserId(user.uid);
    } else {
      console.log("no auth found");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("User").get();
      setUsers(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      // setLoading(true);
    };
    fetchData();
  }, []);

  return (
    <>
      <Meta title="Senarai Pengguna Sistem | Admin Dashboard" />
      <div
        className="w-full lg:max-h-screen p-5 mt-6 mb-20 lg:mt-0 text-gray-900 leading-normal rounded-md"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div className="inline-block md:flex md:justify-between">
          <div>
            <p className="text-2xl">Pengguna Sistem</p>
          </div>
          <div className="mr-10">
            <Link
              to="/admin/manage-users/new"
              className="btn-sm text-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600 my-3 md:my-0 md:ml-3"
            >
              <span>
                <div className="flex justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>{" "}
                  <span className="ml-2">Tambah Pengguna</span>
                </div>
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-lg py-2">Pelajar</p>
        <div>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                <th className="w-5/12 px-4 py-2 text-left">Emel</th>
                <th className="w-5/12 px-4 py-2 text-left">Nama Penuh</th>
                <th className="w-1/12 px-4 py-2 ">Posisi</th>
                <th className="w-1/12 px-4 py-2 ">Tindakan</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {/* {!uploads && <>No post found!</>} */}
              {users.map((e) => (
                <React.Fragment key={e.id}>
                  <>
                    {e.type === "Pelajar" ? (
                      <ManageUsersTable
                        fileShowHide={e.onHide}
                        id={e.id}
                        fullname={e.name}
                        email={e.email}
                        role={e.type}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <p className="text-lg py-2">Peniaga</p>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                <th className="w-5/12 px-4 py-2 text-left">Emel</th>
                <th className="w-5/12 px-4 py-2 text-left">Nama Penuh</th>
                <th className="w-1/12 px-4 py-2 ">Posisi</th>
                <th className="w-1/12 px-4 py-2 ">Tindakan</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {/* {!uploads && <>No post found!</>} */}
              {users.map((e) => (
                <React.Fragment key={e.id}>
                  <>
                    {e.type === "Peniaga" ? (
                      <ManageUsersTable
                        fileShowHide={e.onHide}
                        id={e.id}
                        fullname={e.name}
                        email={e.email}
                        role={e.type}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <p className="text-lg py-2">Bendahari</p>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                <th className="w-5/12 px-4 py-2 text-left">Emel</th>
                <th className="w-5/12 px-4 py-2 text-left">Nama Penuh</th>
                <th className="w-1/12 px-4 py-2 ">Posisi</th>
                <th className="w-1/12 px-4 py-2 ">Tindakan</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {/* {!uploads && <>No post found!</>} */}
              {users.map((e) => (
                <React.Fragment key={e.id}>
                  <>
                    {e.type === "Bendahari" ? (
                      <ManageUsersTable
                        fileShowHide={e.onHide}
                        id={e.id}
                        fullname={e.name}
                        email={e.email}
                        role={e.type}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-10">
          <p className="text-lg py-2">Admin</p>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                <th className="w-5/12 px-4 py-2 text-left">Emel</th>
                <th className="w-5/12 px-4 py-2 text-left">Nama Penuh</th>
                <th className="w-1/12 px-4 py-2 ">Posisi</th>
                <th className="w-1/12 px-4 py-2 ">Tindakan</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {/* {!uploads && <>No post found!</>} */}
              {users.map((e) => (
                <React.Fragment key={e.id}>
                  <>
                    {e.type === "admin" ? (
                      <ManageUsersTable
                        fileShowHide={e.onHide}
                        id={e.id}
                        fullname={e.name}
                        email={e.email}
                        role={e.type}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
