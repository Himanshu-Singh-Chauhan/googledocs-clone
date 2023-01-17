import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/react";
import Login from "../../components/Login";
import { collection, doc } from "firebase/firestore";
import TextEditor from "../../components/TextEditor";

function Doc() {
  const { data: session } = useSession();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const thisdoc = doc(
    collection(doc(collection(db, "userDocs"), session.user.email), "docs"),
    id
  );

  const [snapshot, loadingSnapshot] = useDocumentOnce(thisdoc);

  if (!loadingSnapshot && !snapshot?.data().name) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <IconButton variant="text">
            <i className="material-icons">description</i>
          </IconButton>
        </span>

        <div className="flex-grow px-2">
          <h2> {snapshot?.data()?.name} </h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <img className="cursor-pointer rounded-full h-10 w-10 ml-2" src={session.user.image}/>
      </header>

      <TextEditor/>
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
      props: {
          session,
      },
  }
}