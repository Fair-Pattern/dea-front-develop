import { useSession } from "next-auth/client";
import { AdminLayout } from "../../components/layout/admin";

const Admin = () => {
  const [session] = useSession();
  return <></>;
};
Admin.Layout = AdminLayout;
export default Admin;
