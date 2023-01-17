import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { IconButton } from "@material-tailwind/react";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { useState } from "react";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { orderBy, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import { Fragment } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const colRef = collection(db, "userDocs");
  // addDoc(colRef, {email: session.user.email})

  const docRef = doc(colRef, session.user.email);
  const docsRef = collection(docRef, "docs");

  const [ snapshot ] = useCollectionOnce(query(docsRef, orderBy("timestamp")));
  // console.log(snapshot.docs);

  const createDocument = () => {
    if (!input) return;

    addDoc(docsRef, { name: input, timestamp: serverTimestamp() });

    // db.collection("userDocs").doc(session.user.email).collection('docs').add({fileName: input, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
    setInput("");
    setShowModal(false);
  };

  const handleOpen = () => setShowModal(!showModal);

  const model = (
    <Dialog open={showModal} handler={handleOpen}>
      <DialogHeader>Name of new document</DialogHeader>
      <DialogBody divider>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={createDocument}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );


  if (!session) return <Login />;

  return (
    // <div className={styles.container}>
    <div>
      <Head>
        <title>Google docs clone</title>
        <meta
          name="Basic document editor linked with google drive"
          content="himanshu singh chauhan"
        />
      </Head>

      <Header></Header>
      {model}

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <IconButton variant="text">
              <i className="material-icons">more_vert</i>
            </IconButton>
          </div>

          <div>
            <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
              <Image
                src="/resources/docs-blank-googlecolors-newdoc.png"
                layout="fill"
                onClick={handleOpen}
                alt="create new document"
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <IconButton color="gray" variant="text">
              <i className="material-icons">folder</i>
            </IconButton>
          </div>

        {snapshot && snapshot.docs.map((doc) => (
          <DocumentRow key={doc.id} id = {doc.id} fileName={doc.data().name} date = {doc.data().timestamp} />
        ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
