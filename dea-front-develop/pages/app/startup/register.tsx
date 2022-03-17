import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, ButtonVariants } from "../../../components/button/Button";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/input/Input";
import { Loader } from "../../../components/Loader";
import { PageContainer } from "../../../components/PageContainer";
import countryService, { Country } from "../../../services/country.service";
import userService, {
  StartupRequest,
  UserRegisterRequest,
  UserType,
} from "../../../services/user.service";
import { retrieveErrorMessage } from "../../../utils/retrieve-validation-error";

const StartupCreate: NextPage = () => {
  const router = useRouter();

  const {
    isLoading: startupLoading,
    error: startupError,
    mutate,
    reset,
  } = useMutation(
    (startUpRequest: StartupRequest) => {
      return userService.createStartup(startUpRequest);
    },
    {
      onSuccess: () => {
        reset();
        router.push("/");
      },
    }
  );

  const [uploadedFile, setUploadedFile] = useState(null);
  const [otherInfo, setOtherInfo] = useState<any>(null);

  const {
    mutate: uploadFileMutate,
    isLoading: uploadLoading,
    error: uploadedFileError,
  } = useMutation(
    (formData: FormData) => {
      return userService.uploadFile(formData, 2);
    },
    {
      onSuccess: (uploadUrl: string) => {
        console.log(otherInfo);
        if (otherInfo) {
          mutate({
            ...otherInfo,
            projectFiles: [
              {
                id: 0,
                projectId: 0,
                url: uploadUrl,
              },
            ],
          });
        }
      },
    }
  );

  return (
    <PageContainer customClasses="mx-48 my-14 flex p-8">
      <Card
        customClasses="h-auto text-black p-8 w-full"
        shadow={false}
        rounded={false}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (uploadedFile) {
              const formData = new FormData();
              formData.append("file", uploadedFile);
              uploadFileMutate(formData);
            }
          }}
        >
          <p className="text-2xl text-red-dark font-bold">
            Add your project Details
          </p>
          <div className="grid grid-cols-3 gap-x-12 pt-12">
            <div className="flex flex-col col-span-1">
              <Input
                type="file"
                label="Upload Business Plan"
                textColor="text-black"
                name="projectFile"
                accept=".doc, .docx,.txt,.pdf"
                autoComplete="new-password"
                className="border-2 border-gray-400"
                onChange={(e: any) => {
                  if (e?.target?.files?.length > 0) {
                    setUploadedFile(e?.target?.files[0]);
                  }
                }}
              />
              {retrieveErrorMessage(uploadedFileError) && (
                <span className="text-sm text-red-dark">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: retrieveErrorMessage(uploadedFileError),
                    }}
                  />
                </span>
              )}
              <Input
                type="text"
                label="Project Name"
                error={retrieveErrorMessage(startupError, "Name")}
                textColor="text-black"
                name="name"
                autoComplete="new-password"
                onChange={(e) => {
                  setOtherInfo({ ...(otherInfo || {}), name: e.target.value });
                }}
                className="border-2 border-gray-400"
              />{" "}
            </div>
            <div className="flex flex-col col-span-2">
              <Input
                type="textarea"
                label="Summary of the idea"
                error={retrieveErrorMessage(startupError, "Description")}
                textColor="text-black"
                name="description"
                autoComplete="new-password"
                onChange={(e) => {
                  setOtherInfo({
                    ...(otherInfo || {}),
                    description: e.target.value,
                  });
                }}
                className="border-2 border-gray-400"
              />{" "}
              <div className="flex align-middle 2xl:pt-24 pt-8">
                <Button
                  type="submit"
                  variant={ButtonVariants.RED}
                  loading={startupLoading || uploadLoading}
                >
                  Create Startup
                </Button>{" "}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </PageContainer>
  );
};

export default StartupCreate;
