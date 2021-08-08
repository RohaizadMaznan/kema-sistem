import React, { useState } from "react";
import fire from "../auth/fbAuth";
import ProfileInput from "./ProfileInput";
import { useToasts } from "react-toast-notifications";

export default function ChangePasswordForm() {
  const { addToast } = useToasts();
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

//   const reauthenticate = (currentPassword) => {
//     var user = fire.auth().currentUser;
//     var cred = fire.auth.EmailAuthProvider.credential(
//       user.email,
//       currentPassword
//     );
//     return user.reauthenticateWithCredential(cred);
//   };

  const handleNewPassword = (e, currentPassword) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      const message = "Kata Laluan tidak sama";
      addToast(message, {
        appearance: "warning",
        autoDismiss: true,
      });
      return null;
    }

    const promises = [];
    if (confirmPass) {
      promises.push(fire.auth().currentUser.updatePassword(confirmPass));
    }

    Promise.all(promises)
      .then(() => {
        const message = "Kata Laluan telah dikemaskini!";
        addToast(message, {
          appearance: "success",
          autoDismiss: true,
        });
        console.log("Berjaya!")
      })
      .catch((err) => {
        const message = err.message;
        addToast(message, { appearance: "error", autoDismiss: true });
      });
    // else {
    //   const message = "Password and password confirmation is match!";
    //   addToast(message, {
    //     appearance: "success",
    //     autoDismiss: true,
    //   });
    //   return null;
    // }
    // console.log(confirmPass);

    // reauthenticate(currentPassword)
    //   .then(() => {
    //     var user = fire.auth().currentUser;
    //     user
    //       .updatePassword(confirmPass)
    //       .then(() => {
    //         console.log("Password updated!");
    //       })
    //       .catch((err) => {
    //         const message = err.message;
    //         addToast(message, { appearance: "error", autoDismiss: true });
    //       });
    //   })
    //   .catch((err) => {
    //     const message = err.message;
    //     addToast(message, { appearance: "error", autoDismiss: true });
    //   });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleNewPassword}>
        <ProfileInput
          inputType="password"
          value={currPass}
          aria-describedby="curPass-helper-text"
          onChange={({ target }) => setCurrPass(target.value)}
          inputName="currPass"
          id="currPass"
          label="Kata Laluan Sediakala"
          placeholder="Kata Laluan Sediakala"
        />
        <ProfileInput
          inputType="password"
          value={newPass}
          aria-describedby="newPass-helper-text"
          onChange={({ target }) => setNewPass(target.value)}
          inputName="newPass"
          id="newPass"
          label="Kata Laluan Baru"
          placeholder="Kata Laluan Baru"
        />
        <ProfileInput
          inputType="password"
          value={confirmPass}
          aria-describedby="confirmPass-helper-text"
          onChange={({ target }) => setConfirmPass(target.value)}
          inputName="confirmPass"
          id="confirmPass"
          label="Sahkan Kata Laluan"
          placeholder="Sahkan Kata Laluan"
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
    </>
  );
}
