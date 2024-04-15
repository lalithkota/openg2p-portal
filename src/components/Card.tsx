import Link from "next/link";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {prefixBasePath} from "@/utils/path";

export default function Card() {
  const lang = useLocale();
  const t = useTranslations();
  return (
    <>
      <div
        className="w-full flex flex-row mx-auto max-w-screen-xl font-fontcustom gap-8 m-4 p-6 md:space-x-16px "
        style={{gap: "24px", marginTop: "0px"}}
      >
        <CardItem
          title={t("All Programs")}
          heading1={t("Healthcare")}
          description1={t("@Healthcare_description")}
          imagePath1={prefixBasePath("/img/medical_services_FILL0_wght400_GRAD0_opsz48@2x.png")}
          link1={`/${lang}/programs`}
          heading2={t("Education")}
          description2={t("@Healthcare_description")}
          imagePath2={prefixBasePath("/img/school_FILL0_wght400_GRAD0_opsz48@2x.png")}
          link2={`/${lang}/programs`}
        />
        <CardItem
          title={t("Other Services")}
          heading1={t("KYC")}
          description1={t("Tap here for assistance")}
          imagePath1={prefixBasePath("/img/person_filled_FILL0_wght400_GRAD0_opsz48@2x.png")}
          link1="#"
          heading2={t("Housing")}
          description2={t("Tap here for assistance")}
          imagePath2={prefixBasePath("/img/real_estate_agent_FILL0_wght400_GRAD0_opsz48@2x.png")}
          link2="#"
        />
        <CardItem
          title={t("Entitlements")}
          heading1={t("Applications")}
          description1={t("Tap to view your Applications")}
          imagePath1={prefixBasePath("/img/applications.png")}
          link1={`/${lang}/applications`}
          heading2={t("Benefits")}
          description2={t("Tap to view your Benefits")}
          imagePath2={prefixBasePath("/img/benefits.png")}
          link2={`/${lang}/benefits`}
        />
      </div>
    </>
  );
}

export function CardItem({
  title,
  heading1,
  description1,
  imagePath1,
  link1,
  heading2,
  description2,
  imagePath2,
  link2,
}: {
  title: string;
  heading1: string;
  description1: string;
  imagePath1: string;
  link1: string;
  heading2: string;
  description2: string;
  imagePath2: string;
  link2: string;
}) {
  return (
    <div className="flex flex-col w-full bg-brand border border-gray-200 square-lg shadow dark:bg-brand rounded-lg">
      <div className="flex items-center justify-between pt-2 pl-4 mb-2 ">
        <h5
          className="font-fontcustom "
          style={{
            font: "normal normal 600 16px/20px Inter",
            letterSpacing: "0px",
            color: "#484848",
            opacity: "1",
            whiteSpace: "nowrap",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {title}
        </h5>
      </div>
      <hr className="border-t mx-0 border-gray-200 " />
      <div className="flow-root">
        <ul role="list" className="flex-col p-0 m-2 justify-center">
          <li className="p-1 sm:py-4">
            <div className="h-16 pl-0 bg-opacity-10 bg-white bg-no-repeat border  border-gray-300 rounded-lg opacity-100 flex items-start space-x-4">
              <div
                className=""
                style={{
                  width: "60px",
                  height: "60px",
                  marginTop: "6px",
                  marginBottom: "6px",
                  marginRight: "10px",
                  marginLeft: "6px",
                  backgroundImage: "linear-gradient(rgba(96, 100, 199, 0.1), rgba(96, 100, 199, 0.1))",
                  backgroundBlendMode: "multiply",
                  borderRadius: "10px",
                }}
              >
                <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-5 flex-shrink-0">
                  <Image
                    className="w-80 h-80 square-full m-3 max-w-[80%] max-h-[80%]"
                    src={imagePath1}
                    alt="Image"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 mt-2 ml-3 ">
                <Link href={link1} className="text-sm font-medium text-gray-100 truncate columnElement">
                  {heading1}
                </Link>
                <p className="text-sm text-gray-600 truncate dark:text-gray-400 columnElement">
                  {description1}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flow-root">
        <ul role="list" className="flex-col p-0 m-2 justify-center">
          <li className="p-1 sm:py-4">
            <div className="h-16 pl-0 bg-opacity-10 bg-white bg-no-repeat border  border-gray-300 rounded-lg opacity-100 flex items-start space-x-4">
              <div
                className=""
                style={{
                  width: "60px",
                  height: "60px",
                  marginTop: "6px",
                  marginBottom: "6px",
                  marginRight: "10px",
                  marginLeft: "6px",
                  backgroundImage: "linear-gradient(rgba(96, 100, 199, 0.1), rgba(96, 100, 199, 0.1))",
                  backgroundBlendMode: "multiply",
                  borderRadius: "10px",
                }}
              >
                <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-4 flex-shrink-0 ">
                  <Image
                    className="w-80 h-80 square-full m-3 max-w-[80%] max-h-[80%]"
                    src={imagePath2}
                    alt="Image"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 mt-2 ml-3">
                <Link href={link2} className="text-sm font-medium text-gray-100 truncate columnElement">
                  {heading2}
                </Link>
                <p className="text-sm text-gray-600 truncate dark:text-gray-400 columnElement">
                  {description2}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-auto mb-3" style={{marginBottom: "10px"}}>
        <Link
          href={link2}
          className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline "
          style={{
            font: "normal normal 600 14px/20px Inter",
          }}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
