import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return <div>{JSON.stringify(currentUser)}</div>;
};

export default Home;
