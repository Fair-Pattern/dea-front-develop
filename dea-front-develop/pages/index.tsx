import type { NextPage } from "next";
import { useQuery } from "react-query";
import { Card } from "../components/Card";
import { PageContainer } from "../components/PageContainer";
import { Icon } from "../components/user-profile-section";
import userService, {
  UserInterest,
  UserProfile,
  UserProject,
} from "../services/user.service";
import Link from "../components/Link";
import Modal from "../components/modal/modal";
import { StartUpInfo } from "../components/search/sartup/iteminfo";
import startUpService from "../services/startup.service";
import { useState } from "react";
import ChatBot from "../components/chat/chat";

const ProfileSection = ({
  firstName,
  lastName,
  profilePicUrl,
  country,
}: Partial<UserProfile>) => (
  <div className="flex flex-col items-center justify-center">
    <Icon height="h-40" width="w-40" image={profilePicUrl} />
    <span className="text-red-dark text-2xl font-bold">
      {firstName} {lastName}
    </span>
    <span className="text-gray-dark text-sm font-bold">{country?.name}</span>
  </div>
);

type InterestProps = {
  interests: UserInterest[];
};
const InterestSection = ({ interests }: InterestProps) => (
  <div className="pt-4 flex flex-col items-center justify-center">
    <span className="text-gray-semidark text-xs">interest</span>
    <div className="grid grid-cols-3 pt-4">
      {(interests || []).map((interest, index) => (
        <span
          className="bg-blue-dark text-white text-xs text-center rounded-xl px-2   m-2"
          key={index}
        >
          {interest.name}
        </span>
      ))}
    </div>
  </div>
);

type ProjectProps = {
  projects: UserProject[];
};
const ProjectSection = ({ projects }: ProjectProps) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const {
    data: projectInfo,
    isSuccess,
    isLoading,
    refetch,
  } = useQuery(["startup", id], () => startUpService.find(String(id)));

  return (
    <div className="pt-2 flex flex-col items-start">
      <span className="text-red-dark text-xs">Projects:</span>
      <ul className="pt-2">
        {(projects || []).map((project, index) => (
          <li
            key={index}
            className="flex items-center pb-2 cursor-pointer"
            onClick={() => {
              setId(project.id);
              refetch();
              setShowModal(true);
            }}
          >
            <Icon
              height="h-0.5"
              width="w-0.5"
              image="/images/project-checkbox.png"
            />
            <span className="pl-2">{project?.name}</span>
          </li>
        ))}
        {(!projects || !projects.length) && (
          <span>No projects assigned yet!</span>
        )}
      </ul>
      {projectInfo && (
        <>
          {showModal && (
            <Modal
              cancelOnClickOutSide={false}
              onCancel={() => setShowModal(false)}
            >
              <StartUpInfo
                item={projectInfo}
                onCancel={() => setShowModal(false)}
                showInfo={false}
                showSummary={true}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoading, data: user } = useQuery<UserProfile>(
    "profile",
    userService.getProfile
  );

  return <>
    <PageContainer
      customClasses="bg-card-background bg-cover mx-52 my-14 flex bg-cover"
      loading={isLoading}
    >
      {user && (
        <>
          <Card
            customClasses="h-120 bg-white w-160 text-black p-12"
            shadow={false}
            rounded={false}
          >
            <ProfileSection
              firstName={user?.firstName}
              lastName={user?.lastName}
              profilePicUrl={user?.profilePicUrl}
              country={user?.country}
            />
            <InterestSection interests={user?.interests} />
            <div className="flex items-center justify-center pt-20 text-gray-dark w-full">
              <Link underline href="/app/profile">
                Edit Profile
              </Link>
              <Icon
                image="/images/edit.png"
                height="h-2"
                width="w-2"
                classes="filter brightness-200 grayscale "
              />
            </div>
          </Card>
          <Card
            customClasses="h-120 pl-20 w-full text-black p-12 bg-gradient bg-cover"
            shadow={false}
            rounded={false}
          >
            <ProjectSection projects={user?.projects} />
          </Card>
        </>
      )}
      {!user && <></>}
    </PageContainer>
  </>
};

export default Home;
