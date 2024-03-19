import Link from "next/link";
import Image from "next/image";
import {prefixBasePath} from "@/utils/path";
import {useTranslations} from "@/i18n";

export default function Card() {
  const t = useTranslations();
  return (
    <>
      <div className="w-full flex flex-col mx-auto max-w-screen-xl font-fontcustom md:flex-row gap-8  m-4 p-6 md:space-x-6 ">
        <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
          <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
            <h5 className="text-xl font-bol d leading-none text-gray-600">{t("All Programs")}</h5>
          </div>
          <hr className="border-t mx-0 border-gray-400 " />
          <div className="flow-root">
            <ul role="list" className="flex-col p-0 m-2 justify-center">
              <li className="p-1 sm:py-4">
                <div className="h-16 pl-0 bg-opacity-10 bg-white bg-no-repeat border  border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                    <Image
                      className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/medical.png")}
                      alt="medical"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2 ">
                    <Link href="#" className="text-sm font-medium text-gray-600  no-underline truncate">
                      {t("Healthcare")}
                    </Link>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {t("@Healthcare_description")}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 p-2 ml-0 sm:py-4">
                <div className="h-16 bg-opacity-10  bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                    <Image
                      className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/school_FILL0_wght400_GRAD0_opsz48.png")}
                      alt="school"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2">
                    <Link href="#" className="text-sm font-medium no-underline  text-gray-600 truncate">
                      {t("Education")}
                    </Link>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {t("@Education_description")}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mx-auto mb-2">
            <Link
              href="/programs"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline "
            >
              {t("View all")}
            </Link>
          </div>
        </div>
        <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
          <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
            <h5 className="text-xl font-bol d leading-none text-gray-600">{t("Other Services")}</h5>
          </div>
          <hr className="border-t mx-0 border-gray-400 " />
          <div className="flow-root">
            <ul role="list" className="flex-col p-0 m-2 justify-center">
              <li className="p-1 ml-0 sm:py-4">
                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0 ">
                    <Image
                      className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/person_filled_FILL0_wght400_GRAD0_opsz48.png")}
                      alt="medical"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2 ">
                    <Link href="#" className="text-sm font-medium no-underline  text-gray-600 truncate">
                      {t("Help")}
                    </Link>
                    <p className="text-sm text-gray-500  truncate dark:text-gray-400">
                      {t("Tap here for assistance")}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 p-2 ml-0 sm:py-4">
                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                    <Image
                      className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/school_FILL0_wght400_GRAD0_opsz48.png")}
                      alt="school"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2">
                    <Link href="#" className="text-sm  no-underline  font-medium text-gray-600 truncate">
                      {t("FAQ")}
                    </Link>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {t("Tap to know more")}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mx-auto ">
            <Link
              href="/forms"
              className="text-sm font-medium text-blue-600 hover:underline no-underline  dark:text-blue-500"
            >
              {t("View all")}
            </Link>
          </div>
        </div>

        <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
          <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
            <h5 className="text-xl font-bol d leading-none text-gray-600">{t("Entitlements")}</h5>
          </div>
          <hr className="border-t mx-0 border-gray-400 " />
          <div className="flow-root">
            <ul role="list" className="flex-col p-0 m-2 justify-center">
              <li className="p-1 ml-0 sm:py-4">
                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0 ">
                    <Image
                      className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/applications.png")}
                      alt="medical"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2 ">
                    <Link
                      href="/applications"
                      className="text-sm font-medium no-underline  text-gray-600 truncate"
                    >
                      {t("Applications")}
                    </Link>
                    <p className="text-sm text-gray-500  truncate dark:text-gray-400">
                      {t("Tap to view your Applications")}
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3 p-2 ml-0 sm:py-4">
                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                  <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                    <Image
                      className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]"
                      src={prefixBasePath("/img/benefits.png")}
                      alt="school"
                      width={100}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mt-2">
                    <Link
                      href="/benefits"
                      className="text-sm  no-underline  font-medium text-gray-600 truncate"
                    >
                      {t("Benefits")}
                    </Link>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {t("Tap to view your Benefits")}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
