import ProfileView from "./profileView";
import { RoleChecker } from "@/lib/Next-auth/RoleChecker";

export default async function ServerProfileView() {
  // const profile = RoleChecker();
  // console.log(profile, "hello amin");
  return <ProfileView />;
}
