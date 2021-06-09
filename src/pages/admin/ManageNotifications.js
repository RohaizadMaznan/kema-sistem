import React, { useState, useEffect } from "react";
import fire from "../../auth/fbAuth";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import NotificationsTable from "../../components/admin/NotificationsTable";
import Meta from "../../components/Meta";
import moment from "moment";

export default function ManageNotifications() {
  const [noti, setNoti] = useState([]);
  const [userId, setUserId] = useState();

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get document users from firestore based on user.uid
      fire.firestore().collection("User").doc(user.uid).get();

      setUserId(user.uid);
      // console.log(user.uid);
    } else {
      console.log("no auth found");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("notiificationHistory").get();
      setNoti(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      // setLoading(true);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Meta title="Senarai Notifikasi Sistem | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Modul Notifikasi</p>
            </div>
            <div className="mr-10">
              <Link
                to="/admin/manage-notifications/new"
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
                    <span className="ml-2">Tambah Notifikasi</span>
                  </div>
                </span>
              </Link>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                  <th className="w-2/12 px-4 py-2 text-left">Tajuk</th>
                  <th className="w-10/12 px-4 py-2 text-left">Deskripsi Notifikasi</th>
                  <th className="w-1/12 px-4 py-2 "></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {noti.map((e) => (
                  <React.Fragment key={e.id}>
                    <>
                      {/* {console.log(e.date.toDate())} */}
                      <NotificationsTable
                        title={e.title}
                        body={e.body}
                        id={e.id}
                      />
                    </>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
