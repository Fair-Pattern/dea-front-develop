import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Input } from "../components/input/Input";
import { Button, ButtonVariants } from "../components/button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router: any = useRouter();
  const [session, sessionLoading] = useSession();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    console.log("here");
    try {
      //@ts-ignore
      if (session?.user?.userType === 1) {
        router.push("/admin");
        //@ts-ignore
      } else if (session?.user?.userType === 2) {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error);
      setEmail(router.query.email);
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router]);

  useEffect(() => {
    handleRedirect();
  }, [session]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    // setIsLoginStarted(true);
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
    });
    setLoading(false);
  };

  return (
    <>
      {!session?.user && !sessionLoading && (
        <PageContainer customClasses="flex mx-52 my-14 bg-card-background bg-cover">
          <Card customClasses="h-140 bg-blue-dark w-96 text-white p-12 pt-0 text-center">
            <img
              src="/images/art-bw.png"
              width="50"
              className="flex justify-center w-full"
            />
            <form onSubmit={handleLogin} autoComplete="off">
              <Input
                leftIcon={"/images/user.png"}
                type="email"
                placeholder="Username (Your email)"
                error={!!loginError}
                rightIcon={loginError ? "/images/error.png" : null}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError("");
                }}
                value={email}
                required
                // autoComplete="new-password"
              />{" "}
              <Input
                leftIcon={"/images/user.png"}
                type="password"
                placeholder="Password"
                error={!!loginError}
                rightIcon={loginError ? "/images/error.png" : null}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
                // autoComplete="new-password"
              />
              <Button
                type="submit"
                variant={ButtonVariants.RED}
                onClick={(e) => console.log(e)}
                loading={loading}
              >
                Login
              </Button>
              {loginError && <p className="text-red-medium">{loginError}</p>}
              <p className="text-white pt-8">No account yet?</p>
              <Button
              type="button"
                variant={ButtonVariants.WHITE}
                onClick={() => {
                  router.push("/register");
                }}
              >
                Register
              </Button>
            </form>
          </Card>
          <div>
            <div className="p-8">
              <p className="text-4xl text-red-dark font-bold break-words">
                Who <br /> are <br /> We?
              </p>
              <p className="pt-8 text-gray-400">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br />{" "}
                sed diam nonumy eirmod tempor invidunt ut
                <br /> labore et dolore magna aliquyam erat, sed diam
                <br /> voluptua. At vero eos et accusam et justo duo dolores{" "}
                <br /> et ea rebum. Stet clita kasd gubergren, no sea
                <br /> <br />
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                <br />
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                <br />
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                <br />
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                <br />
                et ea rebum. Stet clita kasd gubergren, no sea sed diam nonumy
                <br />
                eirmod tempor invi
              </p>

              <p className="pt-4 text-red-dark text-xl font-bold">
                SED DIAM NONUMY EIRMOD TEMPOR INVI
              </p>
            </div>
          </div>
        </PageContainer>
      )}
    </>
  );
};

export default Login;
