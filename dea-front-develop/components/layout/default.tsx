import classNames from "classnames";
import React from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { PageContainerProps } from "../PageContainer";


export const DefaultLayout = ({
  children
}: PageContainerProps) => {
  return<> 
  <div>{children}</div>
  </>
};