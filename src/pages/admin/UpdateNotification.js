import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

const initialValues = {
  title: "",
  body: "",
};

function UpdateNotification({ history }) {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      await db
        .collection("notiificationHistory")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const noti = doc.data();
            setStates({
              title: noti.title,
              body: noti.body,
            });
          } else {
            console.log("No such document!");
            // alert("No such document!");
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
      .collection("notiificationHistory")
      .doc(id)
      .update({
        title: states.title,
        body: states.body,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Notification has successfully updated in the database!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/admin/manage-notifications");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div>
      <Meta title="Kemaskini Notifikasi | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Kemaskini Notifikasi</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
              <ProfileInput
                inputType="text"
                inputName="id"
                label="ID Notifikasi"
                value={id}
                onChange={handleInputChange}
                disable="true"
              />
              <ProfileInput
                inputType="text"
                inputName="title"
                label="Tajuk"
                value={states.title}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="text"
                inputName="body"
                label="Deskripsi"
                value={states.body}
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

export default withRouter(UpdateNotification);
