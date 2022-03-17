import type { NextPage } from "next";
import { useQuery } from "react-query";
import userService, { UserInterest, UserProfile, UserProject } from "../../../services/user.service";
import { Card } from "../../Card";
import Link from "../../Link";
import { PageContainer } from "../../PageContainer";
import { Icon } from "../../user-profile-section";


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
const ProjectSection = ({ projects }: ProjectProps) => (
  <div className="pt-2 flex flex-col items-start">
    <span className="text-red-dark text-xs">Projects:</span>
    <ul className="pt-2">
      {(projects || []).map((project, index) => (
        <li key={index} className="flex items-center">
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
  </div>
);
type UserProps = {
  user: UserProfile,
  onCancel?: any;
};
const UserInfo = ({user, onCancel = () => { }}:UserProps) => {
  return (
    <PageContainer
      customClasses="bg-card-background bg-cover mx-52 my-14 flex bg-cover"
    >
      {user && (
        <>
          <Card
            customClasses="h-120 bg-white w-160 text-black p-12"
            shadow={false}
            rounded={true}
          >
            <ProfileSection
              firstName={user?.firstName}
              lastName={user?.lastName}
              profilePicUrl={user?.profilePicUrl}
              country={user?.country}
            />
            <InterestSection interests={user?.interests} />
          </Card>
          <Card
            customClasses="h-120 pl-20 w-full text-black p-2 bg-gradient bg-cover"
            shadow={false}
            rounded={true}
          >
              <div className="flex justify-end">
                <img className="p-1 w-4 cursor-pointer" onClick={onCancel} src="/images/remove.png" alt="cancel" />
            </div>
            <ProjectSection projects={user?.projects} />
          </Card>
        </>
      )}
      {!user && <></>}
    </PageContainer>
  );
};

export default UserInfo;
