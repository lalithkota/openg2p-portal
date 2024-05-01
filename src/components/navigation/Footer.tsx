import Image from "next/image";
import Link from "next/link";
import {prefixBasePath} from "@/utils/path";
import {useLocale, useTranslations} from "next-intl";

export default function Footer() {
  const lang = useLocale();
  const t = useTranslations();
  return (
    <footer className="mt-auto relative">
      <div className=" w-full font-fontcustom bg-no-repeat shadow-md opacity-100  bg-brand border-gray-200 p-1 lg:px-4 print:hidden ">
        <div className="flex flex-wrap justify-between items-center  mx-auto  max-w-screen-xl ">
          <Link href={`/${lang}/home`} className="m-3 flex items-center">
            <Image
              src={prefixBasePath("/img/logo@2x.png")}
              priority={true}
              alt="Logo"
              width={300}
              height={300}
              style={{marginBottom: "10px", marginLeft: "30px"}}
            />
          </Link>
          <ul
            className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
            style={{marginBottom: "10px", marginTop: "10px", marginRight: "10px"}}
          >
            <li>
              <Link
                href={`/${lang}/aboutus`}
                className="font-fontcustom m-4"
                style={{
                  top: "226px",
                  left: "159px",
                  width: "98px",
                  height: "20px",
                  textAlign: "left",
                  font: "normal normal 600 16px/20px Inter",
                  letterSpacing: "0px",
                  color: "#484848",
                  opacity: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {t("About Us")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/contactus`}
                className="font-fontcustom m-4"
                style={{
                  top: "226px",
                  left: "159px",
                  width: "98px",
                  height: "20px",
                  textAlign: "left",
                  font: "normal normal 600 16px/20px Inter",
                  letterSpacing: "0px",
                  color: "#484848",
                  opacity: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {t("Contact Us")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/otherpage`}
                className="font-fontcustom m-4"
                style={{
                  top: "226px",
                  left: "159px",
                  width: "98px",
                  height: "20px",
                  textAlign: "left",
                  font: "normal normal 600 16px/20px Inter",
                  letterSpacing: "0px",
                  color: "#484848",
                  opacity: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {t("Others")}
              </Link>
            </li>
          </ul>
        </div>
        <hr
          className="border-gray-200 dark:border-gray-200 lg:my-8 "
          style={{
            marginLeft: "1px",
            marginRight: "1px",
            marginBottom: "3px",
          }}
        />
        <div className="text-center">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            {t("@copyright")}
          </span>
        </div>
      </div>
    </footer>
  );
}
