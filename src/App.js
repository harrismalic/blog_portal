import logo from "./logo.svg";
import "./App.css";
import { Divider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./Pages/layouts/FrontendLayout";
import Home from "./Pages/Home";
import { UNAUTHENTICATED_ROUTES } from "./Utils/Constant";
import PostDetail from "./Pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontendLayout />}>
          <Route path={UNAUTHENTICATED_ROUTES.HOME} element={<Home />} />
          <Route
            path={UNAUTHENTICATED_ROUTES.POST_DETAIL}
            element={<PostDetail />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
