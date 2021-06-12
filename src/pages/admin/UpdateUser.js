import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import fire from "../../auth/fbAuth";
import ProfileInput from "../../components/ProfileInput";
import Meta from "../../components/Meta";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

function UpdateUser({ history }) {
  const { id } = useParams();
  // console.log(id);

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
        .collection("User")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            setStates({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
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
      .collection("User")
      .doc(id)
      .update({
        firstName: states.firstName,
        lastName: states.lastName,
        name: states.firstName + " " + states.lastName,
        email: states.email,
      })
      .then(() => {
        // console.log("Success post")
        // window.location.reload(true)
        addToast("User successfully updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/admin/manage-users");
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div>
      <Meta title="Kemaskini Pengguna Sistem | Admin Dashboard" />
      <div
        className="lg:pl-6 space-y-10 text-gray-900"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div>
          <div className="inline-block md:flex md:justify-between">
            <div>
              <p className="text-2xl">Kemaskini Pengguna</p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
              <ProfileInput
                inputType="text"
                label="ID Pengguna (disabled)"
                value={id}
                onChange={handleInputChange}
                disable="true"
              />
              <ProfileInput
                inputType="text"
                inputName="firstName"
                label="Nama Pertama"
                value={states.firstName}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="text"
                inputName="lastName"
                label="Nama Keluarga"
                value={states.lastName}
                onChange={handleInputChange}
              />
              <ProfileInput
                inputType="email"
                inputName="email"
                label="Emel"
                value={states.email}
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

export default withRouter(UpdateUser);
