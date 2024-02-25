import { useEffect, useState } from "react";
import { Sidebar as SidebarFlow } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/features/auth/authSlice";
import { useCloseSessionMutation } from "../redux/services/auth/authApi";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const [tab, setTab] = useState("");

  const [closeSession, { isLoading }] = useCloseSessionMutation();

  const handleSignout = async () => {
    try {
      const resp = await closeSession().unwrap();
      if (resp?.statusCode === 200) {
        dispatch(signoutSuccess(resp));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <SidebarFlow className="w-full md:w-56">
      <SidebarFlow.Items>
        <SidebarFlow.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser?.user?.role === "ADMIN" && (
            <Link to="/container?tab=dashboard">
              <SidebarFlow.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Panel
              </SidebarFlow.Item>
            </Link>
          )}
          <Link to="/container?tab=profile">
            <SidebarFlow.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser?.user?.role === "ADMIN" ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Perfil
            </SidebarFlow.Item>
          </Link>
          {currentUser?.user?.role === "ADMIN" && (
            <Link to="/container?tab=posts">
              <SidebarFlow.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Publicaciones
              </SidebarFlow.Item>
            </Link>
          )}
          {currentUser?.user?.role === "ADMIN" && (
            <>
              <Link to="/container?tab=users">
                <SidebarFlow.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Usuarios
                </SidebarFlow.Item>
              </Link>
              <Link to="/container?tab=comments">
                <SidebarFlow.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comentarios
                </SidebarFlow.Item>
              </Link>
            </>
          )}
          <SidebarFlow.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Cerrar sesión
          </SidebarFlow.Item>
        </SidebarFlow.ItemGroup>
      </SidebarFlow.Items>
    </SidebarFlow>
  );
};

export default Sidebar;
