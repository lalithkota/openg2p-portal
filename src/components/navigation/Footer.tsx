import Image from "next/image";
import Link from "next/link";
import {prefixBasePath} from "@/utils/path";
import {useTranslations} from "@/i18n";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="mt-auto">
      <div className=" w-full font-fontcustom bg-no-repeat shadow-md opacity-100  bg-brand border-gray-200 p-1 lg:px-4 print:hidden ">
        <div className="flex flex-wrap justify-between items-center  mx-auto  max-w-screen-xl ">
          <Link href="/home" className="m-3 flex items-center">
            <Image
              src={prefixBasePath("/img/logo@2x.png")}
              priority={true}
              alt="Logo"
              width={300}
              height={300}
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/aboutus" className="mr-4 hover:underline text-gray-500 no-underline md:mr-6 ">
                {t("About Us")}
              </Link>
            </li>
            <li>
              <Link href="contactus" className="mr-4 hover:underline text-gray-500 no-underline md:mr-6">
                {t("Contact Us")}
              </Link>
            </li>
            <li>
              <Link href="/otherpage" className="mr-4 hover:underline text-gray-500 no-underline md:mr-6 ">
                {t("Others")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {t("@copyright")}
        </span>
      </div>
    </footer>
  );
}
