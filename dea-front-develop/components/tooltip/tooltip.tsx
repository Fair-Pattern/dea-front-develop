import React from "react";
import tooltipStyles from "./tooltip.module.css";

export enum TOOLTIP_ALIGNMENT {
  CENTER = "items-center",
  END = "items-end",
}

export enum TOOLTIP_DIRECTION {
  RIGHT = "right",
  BOTTOM = "bottom",
}

type TooltipProps = {
  children: React.ReactNode;
  activator: React.ReactNode;
  alignment?: TOOLTIP_ALIGNMENT;
  direction?: TOOLTIP_DIRECTION;
};

export const Tooltip = ({
  children,
  activator,
  alignment = TOOLTIP_ALIGNMENT.CENTER,
  direction = TOOLTIP_DIRECTION.RIGHT,
}: TooltipProps) => {
  const tipRef: any = React.createRef();

  function handleMouseEnter() {
    console.log(tipRef?.current?.style?.display);
    const currentOpacity = tipRef?.current?.style?.display || "none";
    tipRef.current.style.display = currentOpacity === "none" ? "block" : "none";
  }

  return (
    <div className={`relative flex ${alignment}`} onClick={handleMouseEnter}>
      <div
        className={`absolute whitespace-no-wrap bg-white text-black  top-12 shadow-card rounded-2xl rounded flex items-center transition-all duration-150 ${
          alignment === TOOLTIP_ALIGNMENT.END ? "mb-1" : ""
        } ${tooltipStyles[`tooltipholder--${direction}`]}`}
        style={{ display: "none" }}
        ref={tipRef}
      >
        <div
          className={` h-3 w-3 absolute ${
            tooltipStyles[`tooltip--${direction}`]
          }`}
        />
        {children}
      </div>
      {activator}
    </div>
  );
};
