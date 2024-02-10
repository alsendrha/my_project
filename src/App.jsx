import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import MainContainer from "./pages/MainPage/MainContainer";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route index path="/" element={<MainContainer />} />
          <Route path=":content_title" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
