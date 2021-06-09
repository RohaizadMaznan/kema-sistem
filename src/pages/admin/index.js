import React, { useState, useEffect } from "react";
import fire from "../../auth/fbAuth";
// import { Redirect } from "react-router-dom";
import CouponTable from "../../components/bendahari/CouponTable";
import Meta from "../../components/Meta";

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
      const data = await db.collection("Coupon").get();
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
      <Meta title="KitaShare Student Dashboard | KitaShare Web Application and OCR" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <p className="text-xl">All Coupon Available</p>
          <hr className="my-5" />
          <div>
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="rounded-lg bg-gray-200 text-sm font-medium text-gray-700">
                  <th className="w-2/12 px-4 py-2 text-left">Code</th>
                  <th className="w-2/12 px-4 py-2 text-left">Limit (Max)</th>
                  <th className="w-2/12 px-4 py-2 text-left">Value</th>
                  <th className="w-10/12 px-4 py-2 text-left">Description</th>
                  <th className="w-1/12 px-4 py-2 ">Anonymous</th>
                  <th className="w-1/12 px-4 py-2 ">Share</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {coupons.map((e) => (
                  <React.Fragment key={e.id}>
                    <>
                      <CouponTable
                        code={e.couponCode}
                        limit={e.couponLimit}
                        value={e.couponValue}
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
