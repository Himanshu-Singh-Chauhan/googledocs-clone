import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { IconButton }from "@material-tailwind/react";

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
        </div>
      </section>
    </div>
  );
}
