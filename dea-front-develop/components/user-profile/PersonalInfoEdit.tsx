import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import countryService, { Country } from "../../services/country.service";
import userService, {
  UserInterest,
  UserProfile,
} from "../../services/user.service";
import { retrieveErrorMessage } from "../../utils/retrieve-validation-error";
import { Button, ButtonVariants } from "../button/Button";
import { Card } from "../Card";
import { Input } from "../input/Input";
import Link from "../Link";
import Modal from "../modal/modal";
import Select from "../select/Select";

type InterestProps = {
  interests: UserInterest[] | undefined;
  onInterestChange: Function;
};
const InterestSection = ({
  interests,
  onInterestChange = () => {},
}: InterestProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInterest, setCurrentInterest] = useState("");
  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <span className="text-gray-semidark text-xs">interest</span>
      <div className="grid grid-cols-3 pt-4">
        {(interests || []).map((interest, interestIndex) => (
          <span
            className="bg-blue-dark text-white text-xs text-center rounded-xl px-2 m-2 cursor-pointer"
            key={interestIndex}
            onClick={() => {
              onInterestChange(
                (interests || []).filter((_, index) => index !== interestIndex)
              );
            }}
          >
            {interest.name} <span className="font-bold">-</span>
          </span>
        ))}
        <span
          className="bg-red-dark text-white text-xs text-center rounded-xl px-2 m-2 cursor-pointer"
          onClick={() => setModalVisible(true)}
        >
          +
        </span>
        {modalVisible && (
          <Modal
            onCancel={() => setModalVisible(false)}
            cancelOnClickOutSide={false}
          >
            <Card customClasses="bg-white p-4">
              <Input
                type="text"
                placeholder="Interest"
                className="border-2 shadow-sm"
                onChange={(e) => {
                  setCurrentInterest(e.target.value);
                }}
              />
              <Button
                variant={ButtonVariants.GRAY}
                onClick={() => {
                  if (currentInterest) {
                    onInterestChange([
                      ...(interests || []),
                      { id: 0, name: currentInterest },
                    ]);
                    setCurrentInterest("");
                  }
                  setModalVisible(false);
                }}
              >
                Save
              </Button>
              <Button
                variant={ButtonVariants.RED}
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </Button>
            </Card>
          </Modal>
        )}
      </div>
    </div>
  );
};

export const PersonalInfoEdit = () => {
  const { data: countries = [], isLoading: countryLoading } = useQuery<
    Country[]
  >("countries", countryService.list);

  const {
    isLoading,
    isSuccess,
    data: user,
  } = useQuery<UserProfile>("profile", userService.getProfile, {
    onSuccess(data) {
      setUser(data);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const [userProfile, setUser] = useState<Partial<UserProfile> | any>(user);

  const router = useRouter();

  const {
    mutate: userUpdateMutate,
    isLoading: userUpdateLoading,
    error: userUpdateError,
  } = useMutation(
    (userData: Partial<UserProfile>) => {
      return userService.update(userData);
    },
    {
      onSuccess: (data) => {
        router.push("/");
      },
    }
  );

  const { mutate, isSuccess: uploadLoading } = useMutation(
    (formData: FormData) => {
      return userService.uploadFile(formData, 1);
    },
    {
      onSuccess: (data: string) => {
        userUpdateMutate({
          ...userProfile,
          profilePicUrl: data,
        });
      },
    }
  );

  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <Card
      customClasses=" bg-white w-160 text-black p-12"
      shadow={false}
      rounded={false}
      loading={
        isLoading || countryLoading || userUpdateLoading || uploadLoading
      }
    >
      <label
        className="flex items-center justify-center"
        htmlFor="upload-button"
      >
        {/* <img src="/images/profile-icon.png" className="w-40" /> */}
        <div
          className="relative rounded-full border-gray-300 h-40 w-40 cursor-pointer"
          style={{
            backgroundImage: `url(${
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : null ||
                  userProfile?.profilePicUrl ||
                  "/images/user-profile.png"
            })`,
            backgroundSize: "cover",
          }}
        >
          <Input
            type="file"
            className="hidden"
            id="upload-button"
            onChange={(e: any) => {
              if (e?.target?.files?.length > 0) {
                setSelectedImage(e?.target?.files[0]);
              }
            }}
          />
          <img
            src="/images/upload-icon.png"
            width="30"
            className="absolute bottom-4 right-4"
          />
        </div>
      </label>
      <div className="pt-1">
        <Input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={userProfile?.firstName}
          className="border-2 shadow-sm"
          textColor="text-black"
          error={retrieveErrorMessage(userUpdateError, "FirstName")}
          onChange={(e) =>
            setUser({ ...userProfile, firstName: e.target.value })
          }
        />
      </div>
      <div className="pt-1">
        <Input
          type="text"
          name="last_name"
          placeholder="Last Name"
          error={retrieveErrorMessage(userUpdateError, "LastName")}
          value={userProfile?.lastName}
          className="border-2 shadow-sm"
          textColor="text-black"
          onChange={(e) =>
            setUser({ ...userProfile, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <Select
          customClasses="border-2 border-gray-400 m-0"
          topMargin={false}
          textColor="black"
          name="countryId"
          onChange={(e) =>
            setUser({ ...userProfile, countryId: Number(e.target.value) })
          }
        >
          {countries.map(({ id, name }) => (
            <option key={id} value={id} selected={id === user?.countryId}>
              {name}
            </option>
          ))}
        </Select>
      </div>
      {userProfile?.interests && (
        <InterestSection
          interests={userProfile?.interests}
          onInterestChange={(interests: UserInterest[]) => {
            setUser({ ...userProfile, interests });
          }}
        />
      )}

      <div className="flex items-center justify-center">
        <Link
          onClick={() => {
            if (selectedImage) {
              const formData = new FormData();
              formData.append("file", selectedImage);
              mutate(formData);
            } else {
              userUpdateMutate(userProfile);
            }
          }}
          underline
          href=""
          classes="pt-4 text-red-dark text-sm"
        >
          Save Profile
        </Link>
      </div>
    </Card>
  );
};
