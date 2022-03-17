/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StartUp } from "../../../services/startup.service";
import { Button, ButtonVariants } from "../../button/Button";
import { Card } from "../../Card";
export interface StartUpInfoProps {
  onCancel?: any;
  item: StartUp;
  showInfo?: boolean;
  showSummary?: boolean;
}
export const StartUpInfo = ({
  item,
  onCancel = () => {},
  showInfo = true,
  showSummary = false,
}: StartUpInfoProps) => {
  const BasicInfo = () => (
    <>
      <div className="relative">
        <div className="p-12 text-center font-extrabold text-red-700 text-2xl">
          <h1>{item.name}</h1>
        </div>
      </div>
      {showInfo && (
        <div className="p-4 text-sm">
          <span>
            Uploaded by User{" "}
            {item?.user?.firstName + " " + item?.user?.lastName} (
            <span className="text-gray-500 font-bold">
              {" "}
              {item?.user?.email}
            </span>{" "}
            )
          </span>
        </div>
      )}
      <div className="p-4 flex justify-center">
        <Button
          customClasses="p-4 flex"
          variant={ButtonVariants.RED}
          type="button"
          onClick={() => {
            window.open(item?.files[0]?.url, "_blank");
          }}
        >
          Download business plan{" "}
          <img
            className="w-6 p-1 ml-3"
            src="/images/download.png"
            alt="dowload"
          />
        </Button>
      </div>
    </>
  );

  if (showSummary) {
    return (
      <Card customClasses="bg-white w-fit text-black p-2 h-auto">
        <div className="flex justify-end">
          <img
            className="p-1 w-4 cursor-pointer"
            onClick={onCancel}
            src="/images/remove.png"
            alt="cancel"
          />
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <BasicInfo />
          </div>
          <div className="col-span-2 pl-4">
            <p className="text-red-dark text-2xl font-bold">
              What are we up to?
            </p>
            <p className="pt-2">{item.description}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card customClasses="bg-white w-96 text-black p-2 h-auto">
        <div className="flex justify-end">
          <img
            className="p-1 w-4 cursor-pointer"
            onClick={onCancel}
            src="/images/remove.png"
            alt="cancel"
          />
        </div>
        <BasicInfo />
      </Card>
    </>
  );
};
