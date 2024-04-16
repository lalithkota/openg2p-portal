"use client";
import Link from "next/link";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {AuthUtil} from "@/components/auth";
import {ApplicationDetails, Profile} from "@/types";
import {fetchApplicationDetails, fetchPrograms, fetchProfile} from "@/utils";
import {prefixBasePath} from "@/utils/path";

export default function Submitted() {
  const lang = useLocale();
  AuthUtil({failedRedirectUrl: `/${lang}/login`});

  const [isToastVisible, setIsToastVisible] = useState(true);
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const searchParams = useSearchParams();
  const programId = searchParams.get("programId");

  const t = useTranslations();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfile = await fetchProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programs = await fetchPrograms();
        const applications = await fetchApplicationDetails();
        const program = programs.find((prog) => prog.id === Number(programId)); // Find the program by ID
        if (program) {
          // Filter applications for those that match the program name and sort them to get the latest one
          const filteredApplications = applications.filter((app) => app.program_name === program.name);
          const latestApplication = filteredApplications.sort((a, b) => {
            const dateA = new Date(a.date_applied);
            const dateB = new Date(b.date_applied);
            return dateB.getTime() - dateA.getTime();
          })[0];
          if (latestApplication) {
            setApplicationDetails(latestApplication);
          }
        }
      } catch (error) {
        console.error("Error fetching applications details:", error);
      }
    };
    fetchData();
  }, [programId]);
  const handlePrint = () => {
    window.print();
  };
  const hideToastSuccessMsg = () => {
    setIsToastVisible(false);
  };
  return (
    <div className=" rounded-lg border-gray-200 m-6 p-4 " style={{marginLeft: "28px", marginTop: "10px"}}>
      <div className="print:hidden">
        <div
          className="text-gray-700 text-xl "
          style={{
            textAlign: "left",
            font: "normal normal 600 17px/20px Inter",
            letterSpacing: "0px",
            color: "#484848",
            opacity: "1",
            marginLeft: "22px",
            marginTop: "0px",
          }}
        >
          Program Submission
        </div>
        <div
          className="flex flex-wrap gap-2 mt-4 items-center mx-auto max-w-screen-xl"
          style={{
            textAlign: "left",
            font: "normal normal 600 16px/17px Inter",
            letterSpacing: "0px",
            color: "#494DAF",
            opacity: "1",
            marginLeft: "22px",
            marginRight: "10px",
            marginBottom: "25px",
          }}
        >
          <Link href={`/${lang}/home`} className="flex items-center  text-blue-900">
            {" " + t("Home") + " "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <Link href={`/${lang}/programs`} className="flex items-center  text-blue-900">
            {" " + t("All Programs") + " "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
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
            {t("Program Submission")}
          </p>
        </div>
      </div>
      {applicationDetails && (
        <div>
          <div
            className={`fixed top-110 right-5 md:right-5 w-full md:w-1/4 z-50 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-sm leading-5 ${isToastVisible ? "block" : "hidden"}`}
          >
            <div className="relative">
              Thank you. Your application has been submitted successfully. Please note your application ID for
              future reference - {applicationDetails.application_id}
            </div>
            <button
              className="absolute top-3 right-3 md:right-3 md:top-3 outline-none bg-transparent border-none text-white cursor-pointer p-0"
              onClick={hideToastSuccessMsg}
            >
              <Image src={prefixBasePath("/img/close_icon@2x.png")} alt="close" width={10} height={10} />
            </button>
          </div>

          <div className="flex flex-row gap-6 justify-center mt-4 ">
            <div className=" border border-gray-300 bg-brand container rounded-lg shadow-md">
              <div className="flex-col  flex-wrap justify-between items-center">
                <div className="m-5 ">
                  <p className="text-gray-900 mb-4">
                    Dear {profile?.given_name} {profile?.family_name},
                  </p>
                  <div className="text-gray-700 mb-4">
                    Thank you for submitting your form for the program {applicationDetails.program_name}. Your
                    application number is {applicationDetails.application_id}.
                  </div>
                  <div className="text-gray-700 mb-4"></div>
                  <div className="text-gray-700 mb-4">
                    We appreciate your interest in and we are committed to providing you with the support you
                    need to achieve your goals. Our team will now review your application and assess your
                    eligibility for the scheme. This process may take some time, and we appreciate your
                    patience while we work to provide you with the best possible service.
                  </div>
                  <div className="text-gray-700 mb-4">
                    Please note that if additional information is required to process your application, we
                    will contact you using the email or phone number provided in your application. Therefore,
                    it is important that you check your email and phone regularly to avoid any delays. Once
                    your application has been reviewed, we will notify you of the outcome via email or phone.
                    If your application is approved, we will provide you with the necessary instructions to
                    access the benefits of the scheme.
                  </div>

                  <div className="text-gray-700 mb-4">
                    Thank you once again for your application, and we wish you the best of luck in your future
                    endeavors.
                  </div>
                  <div className="text-gray-700 mb-4">
                    Best regards,
                    <p>Program Management Team</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/2 print:hidden mb-80 flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
              <p className=" text-gray-700 pt-4 pl-4 pb-0  ">{applicationDetails.program_name}</p>
              <button className=" ml-4 mb-4 w-24 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center ">
                {applicationDetails.application_status === "active" ||
                applicationDetails.application_status === "inprogress"
                  ? "Applied"
                  : applicationDetails.application_status}
              </button>
              <hr className="border-t mx-0 border-gray-400 " />
              <div className="pt-4 text-sm text-gray-700 pl-4 pb-0 ">
                <h3>{t("Application ID")}</h3>
                <h1 className="text-black font-bold mb-4">{applicationDetails.application_id}</h1>
                <h3>{t("Submitted On")}</h3>
                <h1 className="text-black font-bold mb-4">{applicationDetails.date_applied?.slice(0, 10)}</h1>
              </div>
              <hr className="border-t mx-0 border-gray-400 " />
              <div className="flex flex-col  gap-2 items-center m-4">
                <Link
                  href={`/${lang}/home`}
                  className=" w-full p-6 h-8 bg-white border border-blue-700 rounded-md text-blue-700 text-sm font-normal flex items-center justify-center"
                >
                  {t("View My Programs")}
                </Link>
                <button
                  className=" w-full p-6 h-8  bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center"
                  onClick={handlePrint}
                >
                  {t("Print")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
