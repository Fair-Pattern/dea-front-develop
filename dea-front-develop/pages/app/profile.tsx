import type { NextPage } from "next";
import { useMutation, useQuery } from "react-query";
import { signOut } from "next-auth/client";
import { Card } from "../../components/Card";
import { PageContainer } from "../../components/PageContainer";
import { Icon } from "../../components/user-profile-section";
import userService, {
  PasswordChangeRequest,
} from "../../services/user.service";
import { Input } from "../../components/input/Input";
import { useState } from "react";
import { Button, ButtonVariants } from "../../components/button/Button";
import { retrieveErrorMessage } from "../../utils/retrieve-validation-error";
import { PersonalInfoEdit } from "../../components/user-profile/PersonalInfoEdit";

const Home: NextPage = () => {
  const { isLoading, error, mutate, reset } = useMutation(
    (request: PasswordChangeRequest) => userService.updatePassword(request),
    {
      onSuccess: (data) => {
        signOut();
      },
    }
  );

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <PageContainer customClasses="bg-card-background bg-cover mx-52 my-14 flex bg-cover">
      <>
        <PersonalInfoEdit />
        <Card
          customClasses="pl-20 w-full text-black p-12 bg-gradient bg-cover"
          shadow={false}
          rounded={false}
          loading={isLoading}
        >
          <form
            className="w-3/4"
            onSubmit={(e) => {
              e.preventDefault();
              //@ts-ignore
              const data = new FormData(e?.target);
              const passwordChangeRequest: PasswordChangeRequest =
                Object.fromEntries(
                  data.entries()
                ) as unknown as PasswordChangeRequest;
              mutate(passwordChangeRequest);
            }}
          >
            <p className="text-xl text-red-dark font-bold">
              Do you want to change your password?
            </p>
            <div className="mt-8">
              <Input
                type="password"
                name="currentPassword"
                label="Current Password"
                className="border-2 shadow-sm"
                textColor="text-black"
                error={retrieveErrorMessage(error, "CurrentPassword")}
              />
            </div>
            <div className="mt-4">
              <Input
                type="password"
                name="newPassword"
                label="New Password"
                className="border-2 shadow-sm"
                textColor="text-black"
                error={retrieveErrorMessage(error, "NewPassword")}
              />
            </div>
            <div className="mt-4">
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                className="border-2 shadow-sm"
                textColor="text-black"
                error={retrieveErrorMessage(error, "ConfirmPassword")}
              />
            </div>
            <div className="mt-10">
              <Button variant={ButtonVariants.RED} type="submit">
                Change password
              </Button>
            </div>
            {retrieveErrorMessage(error) && (
              <span className="text-red-dark font-bold flex justify-center items-center">
                {retrieveErrorMessage(error)}
              </span>
            )}
            {showSuccess && (
              <span className="flex justify-center items-center">
                <Icon
                  height="h-0.5"
                  width="w-0.5"
                  image="/images/project-checkbox.png"
                />
                <span className="pl-2">Password Successfully Changed!</span>
              </span>
            )}
          </form>
        </Card>
      </>
    </PageContainer>
  );
};

export default Home;
