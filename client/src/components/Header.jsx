import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/features/auth/authSlice";
import { toggleTheme } from "../redux/features/theme/themeSlice";
import { useCloseSessionMutation } from "../redux/services/auth/authApi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const [closeSession, { isLoading }] = useCloseSessionMutation();

  const handleSignout = async () => {
    try {
      const resp = await closeSession().unwrap();
      if (resp?.statusCode === 200) {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className="border-b-2">
      {/* Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Frankie's
        </span>
        Blog
      </Link>
      {/* Form Search */}
      <form>
        <TextInput
          type="text"
          placeholder="Buscar..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      {/* Search */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      {/* Theme && Sign In */}
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser?.user?.image} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser?.user?.name}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser?.user?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/container?tab=profile"}>
              <Dropdown.Item>Perfil</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Cerrar sesión</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Iniciar sesión
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      {/* Options */}
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={path === "/"}>
          Inicio
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" active={path === "/about"}>
          Nosotros
        </Navbar.Link>
        <Navbar.Link as={Link} to="/projects" active={path === "/projects"}>
          Proyectos
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
