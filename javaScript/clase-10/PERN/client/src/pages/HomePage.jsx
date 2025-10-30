import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const data = useContext(AuthContext);
  console.log(data);

  return <div>HomePage - Welcome </div>;
};

export default HomePage;
