import { useRouter } from "next/router";
import { title } from "process";
import Link from "./Link";

export type MenuItem = {
  title: string;
  link: string;
};

export type NavProps = {
  menu: MenuItem[];
  render?: (title: string, link: string, index: number) => React.ReactNode;
  parentClasses?: string;
};

const DefaultLinkComponent = (title: string, link: string, index: number) => {
  const selectedClass =
    useRouter().asPath === link ? "rounded-2xl border-2 p-1" : "";
  return (
    <Link href={link} key={index} classes={selectedClass}>
      {title}
    </Link>
  );
};

export const Nav = ({
  menu = [],
  render = DefaultLinkComponent,
  parentClasses = "flex justify-between items-center",
}: NavProps) => (
  <div className={parentClasses}>
    {menu.map(({ title, link }, index) => render(title, link, index))}
  </div>
);
