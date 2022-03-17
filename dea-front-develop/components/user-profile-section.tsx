import { signOut, useSession } from "next-auth/client";
import Link from "./Link";
import {
  Tooltip,
  TOOLTIP_ALIGNMENT,
  TOOLTIP_DIRECTION,
} from "./tooltip/tooltip";

const LogoutLink = () => (
  <Link
    href=""
    onClick={(e) => {
      e.preventDefault();
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`,
      });
    }}
  >
    Logout
  </Link>
);

export type ProfileIconProps = {
  height?: string;
  width?: string;
  image?: string;
  classes?: string;
  padding?: string;
};

const DEFAULT_IMAGE = "/images/user-profile.png";

export const Icon = ({
  height = "h-12",
  width = "w-12",
  image = DEFAULT_IMAGE,
  classes = "",
  padding = "p-2",
}: ProfileIconProps) => (
  <div
    className={`rounded-full border-gray-300 ${height} ${width} ${padding} bg-cover ${classes}`}
    style={{
      backgroundImage: `url(${image || DEFAULT_IMAGE})`,
    }}
  ></div>
);

export const UserProfileSection = () => {
  const [session] = useSession();
  const { user: { firstName = "", lastName = "" } = {} } =
    (session as any) || {};
  return (
    <div className="flex items-center float-right p-16 pr-1">
      <Icon />
      <Tooltip
        alignment={TOOLTIP_ALIGNMENT.END}
        direction={TOOLTIP_DIRECTION.BOTTOM}
        activator={
          <span className="pl-4 text-2xl cursor-pointer">
            {firstName} {lastName}
          </span>
        }
      >
        <div className="flex flex-col items-start">
          <div className="flex items-center p-4">
            <Icon />
            <Link classes="pl-2 text-lg cursor-pointer" href="/">
              {firstName} {lastName}
            </Link>
          </div>
          <span className="pl-4 bg-red-dark w-full text-center text-white p-2 rounded-b-2xl">
            <LogoutLink />
          </span>
        </div>
      </Tooltip>
    </div>
  );
};
