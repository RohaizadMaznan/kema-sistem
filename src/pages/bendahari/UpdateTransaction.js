import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";
import moment from "moment";

const initialValues = {
  dateTransaction: "",
  description: "",
  receiver: "",
  receiverRole: "",
  sender: "",
  senderRole: "",
  transactionValue: "",
};

function UpdateTransaction({ history }) {
  const { id } = useParams();
  console.log(id);
  const { addToast } = useToasts();

  const [states, setStates] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      await db
        .collection("Transaction")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const trans = doc.data();
            setStates({
              dateTransaction: trans.date,
              receiver: trans.receiver,
              receiverRole: trans.receiverRole,
              sender: trans.sender,
              senderRole: trans.senderRole,
              transactionValue: trans.transactionValue,
              description: trans.description,
            });
          } else {
            console.log("No such document!");
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
      .collection("Transaction")
      .doc(id)
      .update({
        description: states.description,
        transactionValue: states.transactionValue,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Transaction has successfully updated in the database!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/bendahari/transaction");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div>
      <Meta title="Kemaskini Transaksi | Bendahari Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Kemaskini Transaksi &mdash; {id}</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
              {/* <ProfileInput
                inputType="text"
                inputName="dateTransaction"
                label="Date Transaction (disabled)"
                value="none"
                onChange={handleInputChange}
                disable="true"
              /> */}
              <ProfileInput
                inputType="text"
                inputName="sender"
                label="Penghantar (disabled)"
                value={states.sender}
                onChange={handleInputChange}
                disable="true"
              />
              <ProfileInput
                inputType="text"
                inputName="receiver"
                label="Penerima (disabled)"
                value={states.receiver}
                onChange={handleInputChange}
                disable="true"
              />
              <ProfileInput
                inputType="text"
                inputName="description"
                label="Maklumat Transaksi"
                value={states.description}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="number"
                inputName="transactionValue"
                label="Nilai Transaksi (RM)"
                value={states.transactionValue}
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

export default withRouter(UpdateTransaction);
