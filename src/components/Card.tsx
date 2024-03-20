import Link from "next/link";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {prefixBasePath} from "@/utils/path";

export default function Card() {
  const lang = useLocale();
  const t = useTranslations();
  return (
    <>
      <div className="w-full flex flex-row mx-auto max-w-screen-xl font-fontcustom gap-8 m-4 p-6 md:space-x-6 ">
        <CardItem
          title={t("All Programs")}
          heading={t("Healthcare")}
          description={t("@Healthcare_description")}
          imagePath={prefixBasePath("/img/medical.png")}
          link={`/${lang}/programs`}
        />
        <CardItem
          title={t("Other Services")}
          heading={t("Help")}
          description={t("Tap here for assistance")}
          imagePath={prefixBasePath("/img/person_filled_FILL0_wght400_GRAD0_opsz48.png")}
          link="#"
        />
        <CardItem
          title={t("Entitlements")}
          heading={t("Applications")}
          description={t("Tap to view your Applications")}
          imagePath={prefixBasePath("/img/applications.png")}
          link={`/${lang}/applications`}
        />
      </div>
    </>
  );
}

export function CardItem({
  title,
  heading,
  description,
  imagePath,
  link,
}: {
  title: string;
  heading: string;
  description: string;
  imagePath: string;
  link: string;
}) {
  return (
    <div className="flex flex-col w-full bg-brand border border-gray-200 square-lg shadow dark:bg-brand rounded-lg">
      <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
        <h5 className="text-xl font-bold leading-none text-gray-600">{title}</h5>
      </div>
      <hr className="border-t mx-0 border-gray-400 " />
      <div className="flow-root">
        <ul role="list" className="flex-col p-0 m-2 justify-center">
          <li className="p-1 sm:py-4">
            <div className="h-16 pl-0 bg-opacity-10 bg-white bg-no-repeat border  border-gray-300 rounded-lg opacity-100 flex items-start space-x-4">
              <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                <Image
                  className="w-80 h-80 square-full m-3 max-w-[80%] max-h-[80%]"
                  src={imagePath}
                  alt="Image"
                  width={20}
                  height={10}
                />
              </div>
              <div className="flex-1 min-w-0 mt-2 ">
                <Link href={link} className="text-sm font-medium text-gray-600 truncate">
                  {heading}
                </Link>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{description}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-auto mb-2">
        <Link
          href={link}
          className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline"
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
