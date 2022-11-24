import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { IconButton } from "@material-tailwind/react";

export default function Home() {
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
                src="/../public/resources/docs-blank-googlecolors-newdoc.png"
                layout="fill"
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
        </div>
      </section>
    </div>
  );
}
