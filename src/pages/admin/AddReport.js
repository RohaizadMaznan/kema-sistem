import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

function AddReport({ history }) {
  // const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [userReport, setUserReport] = useState("");
  const { addToast } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection("Report")
      .doc()
      .set({
        report: title,
        reportType: 'Laporan Teknikal',
        userReport: userReport,
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("Laporan berjaya didaftarkan!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/admin/manage-reports");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div>
      <Meta title="Tambah Laporan Baharu | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Tambah Laporan Baharu</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              {/* <div className="md:flex md:items-center mb-6">
                <div className="md:w-3/12">
                  <label
                    className="block text-gray-700 mb-1 md:mb-0 md:text-right pr-5"
                    htmlFor="inline-full-name"
                  >
                    Pilih jenis pengguna
                  </label>
                </div>
                <div className="md:w-9/12">
                  <select
                    isrequired="true"
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                    name="type"
                    id="type"
                    className="bg-gray-100 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="Laporan Teknikal">Laporan Teknikal</option>
                  </select>
                </div>
              </div> */}
              <ProfileInput
                inputType="text"
                inputName="title"
                id="title"
                label="Tajuk Laporan"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <ProfileInput
                inputType="text"
                inputName="userReport"
                id="body"
                label="Pengirim"
                value={userReport}
                onChange={({ target }) => setUserReport(target.value)}
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

export default withRouter(AddReport);
