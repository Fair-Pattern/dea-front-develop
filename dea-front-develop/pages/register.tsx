import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, ButtonVariants } from "../components/button/Button";
import { Card } from "../components/Card";
import { Input } from "../components/input/Input";
import { Loader } from "../components/Loader";
import { PageContainer } from "../components/PageContainer";
import Select from "../components/select/Select";
import countryService, { Country } from "../services/country.service";
import userService, {
  UserRegisterRequest,
  UserType,
} from "../services/user.service";
import { retrieveErrorMessage } from "../utils/retrieve-validation-error";

const Register: NextPage = () => {
  const { data: countries = [] } = useQuery<Country[]>(
    "countries",
    countryService.list
  );
  const router = useRouter();

  const {
    isLoading: registerLoading,
    error: registerError,
    mutate,
    reset,
  } = useMutation(
    (userInfo: UserRegisterRequest) => {
      console.log(userInfo);
      const info = {
        ...userInfo,
      };
      return userService.register(info);
    },
    {
      onSuccess: () => {
        reset();
        router.push("/login");
      },
    }
  );

  return (
    <PageContainer customClasses="bg-profile mx-48 my-14 flex bg-card-background bg-cover p-8">
      <Card
        customClasses="h-120 text-black p-12 w-full"
        shadow={false}
        rounded={false}
      >
        <img src="/images/logo-colorful.png" width="120" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //@ts-ignore
            const data = new FormData(e?.target);
            const formObject: UserRegisterRequest = Object.fromEntries(
              data.entries()
            ) as unknown as UserRegisterRequest;
            mutate({
              ...formObject,
              userType: UserType.USER,
              isDataStore: formObject["isDataStore"] ? true : false,
              isAgreeTermCondition: formObject["isAgreeTermCondition"]
                ? true
                : false,
            });
          }}
        >
          <div className="grid grid-cols-3 gap-x-4 pt-12">
            <div className="flex flex-col">
              <Input
                type="text"
                label="First name"
                error={retrieveErrorMessage(registerError, "FirstName")}
                textColor="text-black"
                name="firstName"
                autoComplete="new-password"
                className="border-2 border-gray-400"
              />{" "}
              <Input
                // leftIcon={"/images/user.png"}
                type="text"
                label="Email (This is also your username)"
                error={retrieveErrorMessage(registerError, "Email")}
                textColor="text-black"
                name="email"
                autoComplete="new-password"
                className="border-2 border-gray-400"
              />{" "}
              <div>
                <Input
                  type="password"
                  label="Password"
                  error={retrieveErrorMessage(registerError, "Password")}
                  textColor="text-black"
                  name="password"
                  autoComplete="new-password"
                  className="border-2 border-gray-400"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                label="Last Name"
                error={retrieveErrorMessage(registerError, "LastName")}
                textColor="text-black"
                name="lastName"
                autoComplete="new-password"
                className="border-2 border-gray-400"
              />{" "}
              <Select
                customClasses="border-2 border-gray-400"
                textColor="black"
                name="countryId"
              >
                {countries.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
              <Input
                type="password"
                label="Confirm Password"
                error={retrieveErrorMessage(registerError, "ConfirmPassword")}
                textColor="text-black"
                name="confirmPassword"
                autoComplete="new-password"
                className="border-2 border-gray-400"
              />{" "}
            </div>
            <div className="flex flex-col">
              <div className="flex align-middle pt-8">
                <Input
                  type="checkbox"
                  name="isDataStore"
                  error={null}
                  defaultChecked={true}
                  autoComplete="new-password"
                  className="border-2 border-gray-400 w-4 h-4 rounded-2xl"
                  textColor="text-black"
                />{" "}
                <span className="pl-2 pt-0.5">
                  I agree to my personal data being stored
                </span>
              </div>
              {retrieveErrorMessage(registerError, "IsDataStore") && (
                <p className="text-xs text-red-dark">
                  {retrieveErrorMessage(registerError, "IsDataStore")}
                </p>
              )}
              <div className="flex align-middle pt-2">
                <Input
                  type="checkbox"
                  name="isAgreeTermCondition"
                  defaultChecked={true}
                  autoComplete="new-password"
                  className="border-2 border-gray-400 w-4 h-4 rounded-2xl"
                  textColor="text-black"
                />{" "}
                <span className="pl-2 pt-0.5">
                  I accept the <a className="underline font-bold" target={'_blank'} href="http://questionnaire.ideaforstartup.eu/en/Privacy" rel="noreferrer">Terms and Conditions</a>
                </span>
              </div>
              {retrieveErrorMessage(registerError, "IsAgreeTermCondition") && (
                <p className="text-xs text-red-dark">
                  {retrieveErrorMessage(registerError, "IsAgreeTermCondition")}
                </p>
              )}
              {retrieveErrorMessage(registerError) && (
                <span className="text-sm text-red-dark">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: retrieveErrorMessage(registerError),
                    }}
                  />
                </span>
              )}
              <div className="flex align-middle 2xl:pt-24 pt-16">
                <Button
                  type="submit"
                  variant={ButtonVariants.RED}
                  loading={registerLoading}
                >
                  Create Account
                </Button>{" "}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </PageContainer>
  );
};

export default Register;
