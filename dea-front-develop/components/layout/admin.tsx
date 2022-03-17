import React from "react";
import { PageContainer, PageContainerProps } from "../PageContainer";
import { SideBar } from "../sidebar/SideBar";

export const AdminLayout = ({ children }: PageContainerProps) => {
  return (
    <>
      <div className="flex">
        <div className="flex-initial ">
          <PageContainer customClasses="p-2 mx-40 my-14 h-auto">
            <SideBar />
          </PageContainer>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
