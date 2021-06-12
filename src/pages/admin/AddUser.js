import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

function AddUser({ history }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const { addToast } = useToasts();

  const handleSignup = async (e) => {
    e.preventDefault();

    const noImg = "no-img.png";

    if (password !== passConf) {
      const message = "Password and password confirmation does not match";
      addToast(message, {
        appearance: "warning",
        autoDismiss: true,
      });
      return null;
    }

    await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        addToast("Successfully register", {
          appearance: "success",
          autoDismiss: true,
        });
        fire
          .firestore()
          .collection("User")
          .doc(user.user.uid)
          .set({
            authProvider: "email",
            firstName: firstName,
            lastName: lastName,
            name: firstName + " " + lastName, 
            email: email,
            type: type,
            userProfilePicture: `https://firebasestorage.googleapis.com/v0/b/kitashare-1653e.appspot.com/o/${noImg}?alt=media`,
            createdAt: new Date().toISOString(),
          });
        history.push("/admin/manage-users");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setPassConf("");
  };

  return (
    <div>
      <Meta title="Tambah Pengguna Sistem | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Tambah Pengguna Sistem</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleSignup}>
              <div className="md:flex md:items-center mb-6">
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
                    <option value="Pelajar">Pelajar</option>
                    <option value="Peniaga">Peniaga</option>
                    <option value="Bendahari">Bendahari</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <ProfileInput
                inputType="text"
                inputName="couponCode"
                id="couponCode"
                label="Nama Pertama"
                value={firstName}
                onChange={({ target }) => setfirstName(target.value)}
              />
              <ProfileInput
                inputType="text"
                inputName="couponLimit"
                id="couponLimit"
                label="Nama Keluarga"
                value={lastName}
                onChange={({ target }) => setlastName(target.value)}
              />
              <hr className="py-3 border-dashed" />
              <ProfileInput
                inputType="email"
                id="email"
                label="Emel"
                value={email}
                aria-describedby="email-helper-text"
                onChange={({ target }) => setEmail(target.value)}
              />
              <ProfileInput
                inputType="password"
                id="password"
                label="Password"
                value={password}
                aria-describedby="password-helper-text"
                onChange={({ target }) => setPassword(target.value)}
              />
              <ProfileInput
                inputType="password"
                id="passConf"
                label="Confirm Password"
                value={passConf}
                aria-describedby="passConf-helper-text"
                onChange={({ target }) => setPassConf(target.value)}
              />

              <div className="mb-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
                >
                  <span className="text-sm">Daftar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddUser);
