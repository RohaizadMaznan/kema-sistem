import React, { useEffect, useState } from "react";
import fire from "../../auth/fbAuth";
import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";
import Meta from "../../components/Meta";

function UpdateCoupon({ history }) {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("Transaction").get();
      setTrans(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      // setLoading(true);
    };
    fetchData();
  }, []);

  const data = [{ id: 1, title: "Conan the Barbarian", year: "1982" }];
  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
      right: true,
    },
  ];

  return (
    <div>
      <Meta title="Add New Coupon | Bendahari Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div>
            <DataTable title="Datatable" columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UpdateCoupon);
