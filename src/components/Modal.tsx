"use client";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import Link from "next/link";
import {Locale} from "@/i18n.config";

export default function Modal({params: {lang}}: {params: {lang: Locale}}) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    if (typeof window !== "undefined") {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    if (typeof window !== "undefined") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" w-full p-6 h-8 bg-white border border-blue-700 rounded-md text-blue-700 text-sm font-normal flex items-center justify-center"
        >
          Cancel
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Discard applicaton?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      The entered data will not be saved. Are you sure you want to discard the form?
                    </p>
                  </div>

                  <div className="mt-4 flex flex-row gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm text-white font-medium focus:outline-none "
                      onClick={closeModal}
                    >
                      Discard
                    </button>
                    <Link href={`/${lang}/home`}>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md   bg-white border border-blue-700 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
