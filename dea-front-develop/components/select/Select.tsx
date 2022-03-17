import classNames from "classnames";
import selectStyles from "./select.module.css";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string | React.ReactNode;
  customClasses?: string;
  textColor?: string;
  topMargin?: boolean;
}

const Select = ({
  children,
  customClasses,
  textColor = "text-red-dark",
  label = <span>&nbsp;</span>,
  topMargin = true,
  ...restProps
}: SelectProps) => {
  const classnames = classNames("", customClasses, {
    ["mt-2"]: topMargin,
    [selectStyles.select]: true,
    [textColor]: true,
  });
  return (
    <div className={topMargin ? "py-2" : ""}>
      {" "}
      {label && <label>{label}</label>}
      <div className="relative">
        <select className={classnames} {...restProps}>
          {children}
        </select>
        <span className={selectStyles.selectIcon}>&nbsp;</span>
      </div>
    </div>
  );
};

export default Select;
