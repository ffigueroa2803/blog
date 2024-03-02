import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Container,
  Home,
  Posts,
  Projects,
  Search,
  SignIn,
  SignUp,
} from "./pages";
import {
  Footer,
  GetPost,
  Header,
  RegisterPost,
  UpdatePost,
} from "./components";
import PrivateRouter from "./routers/PrivateRouter";
import OnlyAdminPrivateRouter from "./routers/OnlyAdminPrivateRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRouter />}>
          <Route path="/container" element={<Container />} />
        </Route>
        <Route element={<OnlyAdminPrivateRouter />}>
          <Route path="/create-post" element={<RegisterPost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/post/:postSlug" element={<GetPost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
