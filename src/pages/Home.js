import React, { useState } from "react";
import fire from "../auth/fbAuth";
import { withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Meta from "../components/Meta";

function SignIn({ history }) {
  const { addToast } = useToasts();

  // Input field for sign in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [remember, setRemember] = useState("");

  // Show password write
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password === "" || email === "") {
      const message = "Tidak boleh dibiarkan kosong!";
      addToast(message, {
        appearance: "warning",
        autoDismiss: true,
      });
      return null;
    }

    await fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        fire
          .firestore()
          .collection("User")
          .where("email", "==", email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().email === "admin@gmail.com") {
                addToast("Selamat datang, Pentadbir!", {
                  appearance: "success",
                  autoDismiss: true,
                });
                history.push("/admin/manage-users");
              } else if (doc.data().email === "bendahari@gmail.com") {
                addToast("Selamat datang, Bendahari!", {
                  appearance: "success",
                  autoDismiss: true,
                });
                history.push("/bendahari/coupon");
              } else {
                addToast("Maklumat pengguna tidak mempunyai akses.", {
                  appearance: "error",
                  autoDismiss: true,
                });
                history.push("/");
              }
            });
          });
        console.log("Berjaya Log masuk");
        //router.push("/")
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
    setEmail("");
    setPassword("");
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
    <Meta title="KEMA" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1" data-aos="zoom-y-out">
              KEMA.
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form data-aos="zoom-y-out" data-aos-delay="150">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                    data-aos="zoom-y-out"
                  >
                    Emel
                  </label>
                  <input
                    id="email"
                    value={email}
                    name="email"
                    type="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Alamat Emel"
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Kata Laluan
                    </label>
                  </div>

                  <div className="relative text-gray-600">
                    <input
                      id="password"
                      value={password}
                      name="password"
                      type={show ? "text" : "password"}
                      className="form-input w-full text-gray-800"
                      placeholder="Kata Laluan"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                    <span
                      onClick={handleClick}
                      className="absolute right-0 top-0 mt-3 mr-4 cursor-pointer"
                    >
                      {show ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-600 ml-2">
                        Kekalkan dalam Sistem
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <span className="text-gray-600 ml-2">
                        Password: Zaq1Xsw2
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    onClick={handleLogin}
                    type="submit"
                  >
                    Log masuk
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(SignIn);
