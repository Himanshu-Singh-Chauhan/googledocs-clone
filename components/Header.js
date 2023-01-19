import { Button, IconButton, Icon } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Header() {

  const { data: session } = useSession();
  
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">

      <IconButton variant="text">
        <i className="material-icons">menu</i>
      </IconButton>

      <IconButton variant="text">
        <i className="material-icons">description</i>
      </IconButton>
      
      <h1 className="ml-2 text-gray-700 text-xl">Docs</h1>

      <div className="mx-5 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <span className="material-symbols-outlined">search</span>
        <input
          placeholder="search"
          type="text"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        ></input>
      </div>

      <IconButton variant="text">
        <i className="material-icons">apps</i>
      </IconButton>

      <img
        onClick={signOut}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.user?.image}
        referrerpolicy="no-referrer"
      />
    </header>
  );
}

export default Header;


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
