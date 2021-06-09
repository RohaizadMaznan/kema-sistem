import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fire from "../../auth/fbAuth";
// import SenderReceiver from "../../components/bendahari/SenderReceiver";
// import { Document, Page } from "react-pdf";
// import Pdf from "react-to-pdf";

// const ref = React.createRef();

const initialValues = {
  receiver: "",
  receiverRole: "",
  sender: "",
  senderRole: "",
  transactionValue: "",
  description: "",
};

function DownloadTransaction(props) {
  const { id } = useParams();
  //   console.log(id);

  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  //   function onDocumentLoadSuccess({ numPages }) {
  //     setNumPages(numPages);
  //   }

  const [states, setStates] = useState(initialValues);

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
              receiver: trans.receiver,
              receiverRole: trans.receiverRole,
              sender: trans.sender,
              senderRole: trans.senderRole,
              transactionValue: trans.transactionValue,
              description: trans.description,
            });
          } else {
            console.log("No such document!");
            alert("No such document!");
          }
        });
      // setLoading(true);
    };
    fetchData();
  }, []);

  const onClickPrint = (e) => {
      e.preventDefault();

      window.print();
  }

  return (
    <div className="w-full lg:max-h-screen">
      <div className="block space-y-20 lg:space-y-0 lg:w-full lg:px-20 px-10 ">
        <div className="mt-10">
          <p className="text-2xl font-bold text-center">
            Resit Transaksi {states.namaPenerima}
          </p>
          {/* <SenderReceiver senderID={states.sender} receiverID={states.receiver} />
           */}

          <div className="block lg:flex lg:justify-between mt-5">
            <div>
              <p>
                Penerima: <b>{states.sender}</b>
              </p>
            </div>
            <div>
              <p>
                Penghantar: <b>{states.receiver}</b>
              </p>
            </div>
          </div>
          <div className="h-auto border border-black mt-5">
            <div className="p-5">
              <p>Maklumat transaksi:</p>
              <p className="mt-5 capitalize">
                {states.description} &mdash; <b>RM {states.transactionValue}</b>
              </p>
              <hr className="my-5" />
              <p className="text-xs leading-3 italic">
                Maklumat transaksi ini menunjukkan penerima memesan{" "}
                {states.description}, berharga RM {states.transactionValue}{" "}
                selepas transaksi pembayaran berjaya.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-xl">
              <b>JUMLAH BESAR: RM {states.transactionValue}</b>
            </p>
          </div>
          <div className="flex justify-center mt-2">
            {/* <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document> */}
            {/* <Pdf targetRef={ref} filename="post.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf> */}
            {/* <Pdf targetRef={ref} filename="transaction.pdf">
              {({ toPdf }) => (
                <>
                  <button
                    type="submit"
                    onClick={toPdf}
                    className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
                  >
                    <span className="text-sm">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                        <span className="pl-2">Menjana Resit</span>
                      </div>
                    </span>
                  </button>
                </>
              )}
            </Pdf> */}
            <button
              type="submit"
              onClick={onClickPrint}
              className="btn-sm text-white shadow-lg bg-blue-500 hover:bg-blue-600"
            >
              <span className="text-sm">
                <div className="flex justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span className="pl-2">Menjana Resit</span>
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadTransaction;
