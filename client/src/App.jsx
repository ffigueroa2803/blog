import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Container,
  Home,
  Projects,
  Search,
  SignIn,
  SignUp,
} from "./pages";
import { Footer, Header } from "./components";
import PrivateRouter from "./routers/PrivateRouter";

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
        {/* <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route> */}
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
