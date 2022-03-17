import Link from "./Link";

export const Logo = () => (
  <div className="flex flex-row ml-2 w-28">
    <img src="/images/logo.png" width={50} />
    <p className="pl-4 text-xs font-bold break-words">
      <Link href="/">Digital Enterpreneurs Academy</Link>
    </p>
  </div>
);
