import Link from "next/link";
import React from "react";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";

export default async function AboutUs({params: {lang}}: {params: {lang: Locale}}) {
  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return null;
  }
  const {page} = dictionary;
  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-xl ">About Us</div>
        <div className="flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl">
          <Link href={`/${lang}/home`} className="flex items-center  text-blue-900">
            {" "}
            Home{" "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p className="m-0">About us</p>
        </div>
        <div className="container">
          <h1
            className="text-3xl font-bold"
            style={{
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              lineHeight: "20px",
              letterSpacing: "0px",
              color: "#333333",
              opacity: 1,
            }}
          >
            {page.about.title}{" "}
          </h1>
          <h2>
            The OpenG2P ERP, built on the excellent Odoo opensource ERP, is an opensource web-based enterprise
            resource planning (ERP) solution for managing many facets of large scale relief program. It can
            both be as a standalone solution and as the administrative interface to the rest of the OpenG2P
            stack. Bootstrapped by DSTI and the Government of Sierra Leone,The Mifos Initiative and Fynarfin,
            “OpenG2P” aims to provide a confluence for and solutions to effectively digitize government to
            person, and large-scale social protection transfers. It is a set of digital building blocks
            helping SPs digitize key cogs & address gaps in the delivery chain of targeting & enrollment, list
            management, payment digitization, & recourse. OpenG2P comprises of several projects (blocks), each
            addressing a single key pain point in the delivery chain. These can be used independently of the
            other blocks depending on a program’s gaps or as a package seamlessly integrated to provide an
            end-to-end solution kit. OpenG2P is under active development. If you need help, would like to
            contribute, or simply want to talk about the project with like-minded individuals, we have a
            number of open channels for communication.
          </h2>
          <p className="text-gray-500">{page.about.description}</p>
        </div>
      </div>
    </div>
  );
}
