import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

const initialValues = {
  code: "",
  limit: "",
  value: "",
  exDesc: "-",
};

function UpdateCoupon({ history }) {
  const { id } = useParams();
  console.log(id);

  //   const [coupons, setCoupons] = useState("");
  //   const [code, setCode] = useState("");
  //   const [limit, setLimit] = useState("");
  //   const [value, setValue] = useState("");
  //   const [desc, setDesc] = useState();
  //   const [exDesc, setExDesc] = useState();
  //   const [userId, setUserId] = useState();
  const { addToast } = useToasts();

  const [states, setStates] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setStates({
      ...states,
      [name]: value,
    });
    // setState({
    //   code: e.target.value,
    //   limit: e.target.value,
    //   value: e.target.value,
    //   exDesc: e.target.value,
    // });
  }

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      await db
        .collection("Coupon")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const coupon = doc.data();
            setStates({
              code: coupon.couponCode,
              limit: coupon.couponLimit,
              value: coupon.couponValue,
              exDesc: coupon.extraDescription,
            });
          } else {
            console.log("No such document!");
            alert("No such document!");
          }
        });
      // setLoading(true);
    };
    fetchData();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection("Coupon")
      .doc(id)
      .update({
        couponCode: states.code,
        couponLimit: states.limit,
        couponValue: states.value,
        description: `This coupon limits to ${states.limit} redemptions and worth RM${states.value}`,
        extraDescription: states.exDesc,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Coupon has successfully updated in the database!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/bendahari/coupon");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div>
      <Meta title="Kemaskini Kupon | Bendahari Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Kemaskini Kupon</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
              <ProfileInput
                inputType="text"
                inputName="code"
                label="Coupon Code"
                value={states.code}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="number"
                inputName="limit"
                label="Coupon Limitations"
                value={states.limit}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="number"
                inputName="value"
                label="Coupon Value (RM)"
                value={states.value}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="text"
                inputName="exDesc"
                label="Description coupon (optional)"
                value={states.exDesc}
                onChange={handleInputChange}
              />

              <div className="mb-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
                >
                  <span className="text-sm">Kemaskini</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UpdateCoupon);
