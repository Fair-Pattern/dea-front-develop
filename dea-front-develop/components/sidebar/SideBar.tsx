import { useRouter } from "next/router";
import React from "react";
import { Button, ButtonVariants } from "../button/Button";
import { ADMIN_MENU } from "../menu";
import { Nav } from "../Nav";
import sidebarStyle from "./sidebar.module.css";

export const SideBar = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-2xl font-extrabold text-red-600 p-4">
        Admin <br /> Tools
      </h1>
      <ul className={`${sidebarStyle.fullWith} p-2`}>
        <Nav
          parentClasses=""
          menu={ADMIN_MENU}
          render={(title, link, index) => (
            <li key={index}>
              <Button
                customClasses="p-3 font-bold w-full"
                onClick={() => {
                  router.push(link);
                }}
                variant={
                  router.asPath === link
                    ? ButtonVariants.BLUEDARK
                    : ButtonVariants.LIGHTGRAY
                }
              >
                {title}
              </Button>
            </li>
          )}
        />
      </ul>
    </>
  );
};
