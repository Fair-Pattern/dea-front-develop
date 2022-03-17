import classNames from "classnames";
import { Loader } from "./Loader";

export type PageContainerProps = {
  children: React.ReactNode;
  shadow?: boolean;
  height?: string | null;
  customClasses?: string;
  rounded?: boolean;
  loading?: boolean;
};

export const Card = ({
  children,
  shadow = true,
  height = null,
  customClasses = "",
  rounded = true,
  loading = false,
}: PageContainerProps) => {
  const classes = classNames("", customClasses, {
    ["rounded-2xl"]: rounded,
    ["shadow-card"]: shadow,
    [`${height}`]: height,
    ["h-120"]: loading,
  });
  return (
    <div className={classes}>
      {loading && (
        <span className="relative left-1/2 top-1/3">
          <Loader color="red-dark" height="10" width="10" />
        </span>
      )}
      {!loading && children}
    </div>
  );
};
