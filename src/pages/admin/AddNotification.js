import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

function AddNotification({history}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { addToast } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection("notiificationHistory")
      .doc()
      .set({
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Notifikasi berjaya didaftarkan!", {
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
      <Meta title="Tambah Notifikasi Baharu | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Tambah Notifikasi Baharu</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <ProfileInput
                inputType="text"
                inputName="title"
                id="title"
                label="Tajuk"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <ProfileInput
                inputType="text"
                inputName="body"
                id="body"
                label="Deskripsi"
                value={body}
                onChange={({ target }) => setBody(target.value)}
              />

              <div className="mb-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
                >
                  <span className="text-sm">Tambah</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddNotification)