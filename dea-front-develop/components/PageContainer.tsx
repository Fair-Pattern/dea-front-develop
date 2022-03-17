import classNames from "classnames";
import loadConfig from "next/dist/server/config";
import { Loader } from "./Loader";
export type PageContainerProps = {
  children: React.ReactNode;
  customClasses?: string;
  loading?: boolean;
};

export const PageContainer = ({
  children,
  customClasses,
  loading = false,
}: PageContainerProps) => {
  const classes = classNames(
    "bg-white shadow-card rounded-2xl",
    {
      "h-96": loading,
    },
    customClasses
  );
  return (
    <div className={classes}>
      {loading && (
        <span className="fixed left-1/2 top-1/3">
          <Loader color="red-dark" height="10" width="10" />
        </span>
      )}
      {!loading && children}
    </div>
  );
};
