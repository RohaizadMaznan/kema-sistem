import React, { useState, useEffect } from "react";
import fire from "../../auth/fbAuth";

const initialValues = {
  nameSender: "",
  namaReceiver: "",
};

function SenderReceiver(senderID, receiverID) {
  const [states, setStates] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
    //   console.log(receiverID);
      const db = fire.firestore();
      await db
        .collection("User")
        .doc(receiverID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            setStates({
              namaPenerima: user.firstName,
            });
            // console.log(states.namaPenerima);
          } else {
            console.log("No such user!");
          }
        });
      // setLoading(true);
    };
    fetchData();
  }, []);

  return (
    <div className="block lg:flex lg:justify-between mt-5">
      <div>
        <p>
          {/* Penerima: <b>{senderID}</b> */}
        </p>
      </div>
      <div>
        <p>
          {/* Penghantar: <b>{receiverID}</b> */}
        </p>
      </div>
    </div>
  );
}

export default SenderReceiver