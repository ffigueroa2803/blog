import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Comments, Dashboard, Posts, Profile, Users } from "../pages";
import { Sidebar } from "../components";

const Container = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <Sidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <Profile />}
      {/* posts... */}
      {tab === "posts" && <Posts />}
      {/* users */}
      {tab === "users" && <Users />}
      {/* comments  */}
      {tab === "comments" && <Comments />}
      {/* dashboard */}
      {tab === "dashboard" && <Dashboard />}
    </div>
  );
};

export default Container;
