import { RoleChecker } from "../../../lib/Next-auth/RoleChecker";
import ProfileView from "./profileView";

export default async function ServerProfileView() {
  // const { profile } = await RoleChecker();
  // let profile;
  return <ProfileView   />;
}
