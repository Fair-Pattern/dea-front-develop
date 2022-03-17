// import { useSession } from "next-auth/react";
import { useSession } from "next-auth/client";
import { QueryClient, useMutation, useQuery } from "react-query";
import { PageContainer } from "../components/PageContainer";
import { api } from "../services/api.service";
import userService from "../services/user.service";

const queryClient = new QueryClient();

const Welcome = () => {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery("user", userService.getProfile);

  const registerMutation = useMutation((newUser: any) => {
    return userService.register(newUser);
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <PageContainer>
      <div>Welcome {user?.name}</div>
      <button
        onClick={() => {
          registerMutation.mutate({ name: "asdas", password: "asdadasdsa" });
        }}
      >
        Create Todo
      </button>
    </PageContainer>
  );
};

export default Welcome;
