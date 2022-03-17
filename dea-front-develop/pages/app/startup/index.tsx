import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, ButtonVariants } from "../../../components/button/Button";
import { Card } from "../../../components/Card";
import { PageContainer } from "../../../components/PageContainer";

const Startup: NextPage = () => {
  const router = useRouter();
  return (
    <PageContainer customClasses=" mx-48 my-14 flex  p-8">
      <Card
        customClasses="h-auto text-black p-8 w-full"
        shadow={false}
        rounded={false}
      >
        <p className="text-red-dark text-3xl font-bold">Why create startup?</p>
        <div className="grid grid-cols-3 pt-8 gap-4 text-gray-400 text-md">
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor
          </div>
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
            <Button
              variant={ButtonVariants.RED}
              customClasses="mt-40"
              onClick={(e) => {
                router.push("/app/startup/register");
              }}
            >
              Create Startup
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Startup;
