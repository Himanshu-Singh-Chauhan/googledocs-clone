import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function TextEditor() {
  const { data: session } = useSession();
//   if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const thisdoc = doc(
    collection(doc(collection(db, "userDocs"), session.user.email), "docs"),
    id
  );

  const [snapshot, loading] = useDocumentOnce(thisdoc)

  useEffect(() => {
    // const t = snapshot?.data()?.editorState;
    if (snapshot?.data()?.editorState) {
        // console.log(snapshot?.data());
        setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)))
    }
  }, [loading]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDoc(
      thisdoc,
      { editorState: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  };

  return ( editorState &&
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session, 
    },
  };
}
