import { signOut, useSession } from "next-auth/client";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { Menu } from "./menu";
import Link from "./Link";
import { UserProfileSection } from "./user-profile-section";
import { UserType } from "../services/user.service";
import { Button, ButtonVariants } from "./button/Button";
import { useRouter } from "next/router";

export const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const profile =
    session && session?.user ? (
      <UserProfileSection />
    ) : (
      <Link as="register" href="register" underline>
        Register
      </Link>
    );

  const {
    user: { userType = UserType.ADMIN, isEligibleForStartUp = false } = {},
  } = (session as any) || {};

  const additionalMenu = isEligibleForStartUp
    ? [
        {
          title: "Startup",
          link: "/app/startup",
        },
      ]
    : [];

  return (
    <div className="bg-blue-dark w-full text-white h-16 flex items-center pt-12 pb-12 fixed top-0 z-10">
      <div className="grid grid-cols-3 items-center w-full">
        <Logo />
        {userType === UserType.USER && (
          <div className="col-span-1">
            <Nav
              menu={[...Menu, ...additionalMenu]}
              render={(title, link, index) =>
                index < 3 ? (
                  <>
                    <Link
                      classes={
                        link === router.asPath
                          ? "border-gray-dark border-2 text-white rounded-xl p-2"
                          : ""
                      }
                      href={link}
                    >
                      {title}
                    </Link>
                  </>
                ) : (
                  <Button
                    width="w-20"
                    variant={ButtonVariants.RED}
                    onClick={(e) => router.push(link)}
                  >
                    {title}
                  </Button>
                )
              }
            />
          </div>
        )}
      </div>
      <div className="absolute right-4 pr-4">{profile}</div>
    </div>
  );
};
