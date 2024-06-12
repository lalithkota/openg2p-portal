"use client";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {AuthUtil} from "@/components/auth";
import {ProgramForm} from "@/types";
import {SubmitForm, fetchProgramForm} from "@/utils";

export default function Apply() {
  const lang = useLocale();
  AuthUtil({failedRedirectUrl: `/${lang}/login`});

  const router = useRouter();
  const [form, setForm] = useState<ProgramForm>();
  const searchParams = useSearchParams();
  const programid = searchParams.get("programid");
  const t = useTranslations();

  useEffect(() => {
    const {Formio, Templates} = require("@tsed/react-formio");
    const tailwind = require("@tsed/tailwind-formio");
    Formio.use(tailwind);
    Templates.framework = "tailwind";

    const fetchData = async () => {
      try {
        const formData: ProgramForm = await fetchProgramForm(Number(programid));
        const formComponents = JSON.parse(formData.schema).components;

        const form = Formio.createForm(document.getElementById("formio"), {
          components: formComponents,
        });

        form.then((form: any) => {
          const customSubmitButton = document.getElementById("custom-submit-button");
          // console.log('Custom Submit Button:', customSubmitButton);
          customSubmitButton?.addEventListener("click", async () => {
            const submission = await form.submit();
            console.log(submission);

            try {
              const data = await SubmitForm(Number(programid), submission.data);
              console.log("Form submission response:", data);
              router.push(`/${lang}/submission?page=submitted&programId=${programid}`);
            } catch (error) {
              console.error("Error submitting form:", error);
            }
          });
        });
        setForm(formData);
      } catch (error) {
        console.error("Error fetching program details:", error);
      }
    };

    fetchData();
  }, [programid, lang, router]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className=" rounded-lg border-gray-200 m-6 p-4 " style={{marginLeft: "28px", marginTop: "10px"}}>
      <div
        className=""
        style={{
          textAlign: "left",
          font: "normal normal 600 17px/20px Inter",
          letterSpacing: "0px",
          color: "#484848",
          opacity: "1",
          marginLeft: "22px",
        }}
      >
        {t("Application Form")}
      </div>
      <div
        className="flex flex-wrap gap-2 mt-4 items-center mx-auto max-w-screen-xl"
        style={{marginBottom: "25px"}}
      >
        <Link
          href={`/${lang}/home`}
          className=""
          style={{
            top: "154px",
            left: "139px",
            width: "40px",
            height: "17px",
            textAlign: "left",
            font: "normal normal 600 16px/17px Inter",
            letterSpacing: "0px",
            color: "#494DAF",
            opacity: "1",
            marginLeft: "22px",
            marginRight: "10px",
          }}
        >
          {t("Home")}
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 320 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
        <Link
          href={`/${lang}/programs`}
          className=""
          style={{
            top: "154px",
            left: "139px",
            width: "40px",
            height: "17px",
            textAlign: "left",
            font: "normal normal 600 16px/17px Inter",
            letterSpacing: "0px",
            color: "#494DAF",
            opacity: "1",
            whiteSpace: "nowrap",
            marginRight: "10px",
          }}
        >
          {t("All Programs")}
        </Link>
        <div style={{marginLeft: "50px"}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </div>
        <p
          className="m-0"
          style={{
            top: "154px",
            left: "317px",
            width: "115px",
            height: "17px",
            textAlign: "left",
            font: "normal normal 600 16px/17px Inter",
            letterSpacing: "0px",
            color: "#848484",
            opacity: "1",
            whiteSpace: "nowrap",
          }}
        >
          {t("Application Form")}
        </p>
      </div>
      <div className="flex flex-row gap-10 justify-center mt-4 align-top ">
        <div className="flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
          <p
            className="shift-right mt-2"
            style={{
              top: "219px",
              left: "159px",
              width: "131px",
              height: "20px",
              textAlign: "left",
              font: "normal normal 600 16px/20px Inter",
              letterSpacing: "0px",
              color: "#484848",
              opacity: "1",
              whiteSpace: "nowrap",
            }}
          >
            {t("Application Form")}
          </p>
          <h1
            className="shift-right mt-0"
            style={{
              top: "242px",
              left: "159px",
              height: "16px",
              textAlign: "left",
              font: "normal normal medium 13px/16px Inter",
              letterSpacing: "0px",
              color: "#959595",
              opacity: "1",
              whiteSpace: "normal", // Allow text to wrap
              display: "inline-block", // Ensure block-level display for proper wrapping
              marginRight: "10px",
            }}
          >
            {form?.program_name}
          </h1>
          <hr className="border-t mx-0 border-gray-300 mt-3" />
          <div id="formio" className="m-4"></div>
        </div>
        <div className="basis-1/2 mb-80 flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
          <p
            className=" text-gray-700 pt-4 pl-4 pb-0 font-fontcustom  "
            style={{
              top: "226px",
              left: "895px",
              height: "20px",
              textAlign: "left",
              font: "normal normal 600 16px/20px Inter",
              letterSpacing: "0px",
              color: "#484848",
              opacity: "1",
              whiteSpace: "normal", // Allow text to wrap
              display: "inline-block", // Ensure block-level display for proper wrapping
              marginRight: "10px",
            }}
          >
            {form?.program_name}
          </p>
          <p
            className=" mt-5 ml-4 mr-4  "
            style={{
              textAlign: "left",
              font: "normal normal normal 14px/17px Inter",
              letterSpacing: "0px",
              color: "#484848",
              opacity: "1",
            }}
          >
            {form?.program_description}
          </p>
          <hr className="border-t mx-0 border-gray-200 mt-2 " />
          <div className="flex flex-col  gap-2 items-center m-4">
            <button
              id="custom-submit-button"
              className=" w-full p-6 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center"
            >
              {t("Submit")}
            </button>
            <button
              onClick={handleCancel}
              className="viewButton w-full p-6 h-8 bg-white-400 rounded-md text-sm font-normal flex items-center justify-center"
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
