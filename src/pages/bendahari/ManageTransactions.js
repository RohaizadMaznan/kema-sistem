import React, { useState, useEffect } from "react";
import fire from "../../auth/fbAuth";
// import { Redirect } from "react-router-dom";
import TransactionsTable from "../../components/bendahari/TransactionsTable";
import Meta from "../../components/Meta";
import moment from "moment";

export default function Index() {
  const [coupons, setCoupons] = useState([]);
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
      const data = await db.collection("Transaction").get();
      setCoupons(
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
      <Meta title="Senarai Transaksi | Bendahari Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <p className="text-2xl">Senarai Transaksi</p>
          <hr className="my-5" />
          <div>
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                  <th className="w-1/12 px-4 py-2 text-left">Penghantar</th>
                  <th className="w-1/12 px-4 py-2 text-left">Penerima</th>
                  <th className="w-2/12 px-4 py-2 text-left">Deskripsi</th>
                  <th className="w-2/12 px-4 py-2 text-left">
                    Kadar Transaksi
                  </th>
                  <th className="w-3/12 px-4 py-2 text-left"></th>
                  <th className="w-1/12 px-4 py-2 "></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {coupons.map((e) => (
                  <React.Fragment key={e.id}>
                    <>
                      {console.log(e.date.toDate())}
                      <TransactionsTable
                        date={moment(e.date.toDate()).fromNow()}
                        sender={e.sender}
                        receiver={e.receiver}
                        value={e.transactionValue}
                        desc={e.description}
                        notiHide={e.onHide}
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
