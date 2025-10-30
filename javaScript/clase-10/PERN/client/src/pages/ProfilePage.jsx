import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return <div>ProfilePage {user?.name}</div>;
};

export default ProfilePage;
