import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

function AddCoupon({history}) {
  const [code, setCode] = useState("");
  const [limit, setLimit] = useState("");
  const [value, setValue] = useState("");
  const [exDesc, setExDesc] = useState();
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const { addToast } = useToasts();

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get document users from firestore based on user.uid
      fire.firestore().collection("User").doc(user.uid).get();

      setUserId(user.uid);
    } else {
      console.log("no auth found");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection("Coupon")
      .doc(code)
      .set({
        userId: userId,
        uploader: "bendahari",
        couponCode: code,
        couponLimit: limit,
        couponValue: value,
        description: `This coupon limits to ${limit} redemptions and worth RM${value}`,
        extraDescription: exDesc,
        createdAt: new Date().toISOString(),
        onHide: false,
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Coupon has successfully inserted in the database!", {
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
      <Meta title="Tambah Kupon Baharu | Bendahari Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Tambah Kupon Baharu</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <ProfileInput
                inputType="text"
                inputName="couponCode"
                id="couponCode"
                label="Kod Kupon"
                value={code}
                onChange={({ target }) => setCode(target.value)}
              />
              <ProfileInput
                inputType="number"
                inputName="couponLimit"
                id="couponLimit"
                label="Had Pengeluaran Kupon"
                value={limit}
                onChange={({ target }) => setLimit(target.value)}
              />
              <ProfileInput
                inputType="number"
                inputName="couponValue"
                id="couponValue"
                label="Jumlah Nilai Kupon (RM)"
                value={value}
                onChange={({ target }) => setValue(target.value)}
              />
              <ProfileInput
                inputType="text"
                inputName="desc"
                id="desc"
                label="Penambahan Maklumat Kupon (Pilihan)"
                value={exDesc}
                onChange={({ target }) => setExDesc(target.value)}
              />

              <div className="mb-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
                >
                  <span className="text-sm">Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddCoupon)