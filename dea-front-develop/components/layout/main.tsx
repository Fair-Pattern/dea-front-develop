import { useSession } from "next-auth/client";
import React from "react";
import { UserType } from "../../services/user.service";
import ChatBot from "../chat/chat";
import { Footer } from "../Footer";
import { Header } from "../Header";

const MainLayout = ({ children }: any) => {
  const [session] = useSession();
  const { user: { userType = UserType.ADMIN } = {} } = (session as any) || {};
  const showFooter = session === null || userType !== UserType.ADMIN;
  const showChatbot = session !==null && userType !== UserType.ADMIN;
  return (
    <div className="main-container">
      <Header />
      <div className="content-wrapper pt-20">{children}</div>
        {/* chat floating button */}
        {showChatbot &&  <ChatBot/>}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
