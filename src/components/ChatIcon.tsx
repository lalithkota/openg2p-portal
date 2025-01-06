"use client";
import React, {useState} from "react";
import Image from "next/image";
import {prefixBasePath} from "@/utils/path";
import {useAuth} from "@/context/global";
import {useTranslations} from "next-intl";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {profile} = useAuth();

  const t = useTranslations();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chat-icon-container">
      <button onClick={toggleChat} className="chat-icon-button">
        <Image src={prefixBasePath("/img/chat.png")} alt="Chat" width={48} height={48} />
      </button>

      {isChatOpen && (
        <div className="chat-popup">
          <p className="font-semibold text-sm font-medium text-gray-100 truncate columnElement ">
            {" "}
            Hi {profile?.given_name || "there"}, {t("how are you doing")}
          </p>
          <p className="text-gray-600 text-sm text-gray-600 truncate dark:text-gray-400 columnElement">
            {t("I am here to assist you Take a few minutes and lets connect")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
