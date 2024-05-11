import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FrontendLayout from "./Pages/layouts/FrontendLayout";
import Home from "./Pages/Home";
import { AUTHENTICATED_ROUTE, UNAUTHENTICATED_ROUTES } from "./Utils/Constant";
import PostDetail from "./Pages/PostDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import CategoryDetail from "./Pages/CategoryDetail";
import SearchDetail from "./Pages/SearchDetail";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { AuthServices } from "./services/authService";
import AdminLayout from "./Pages/admin/layout/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import AdminCategories from "./Pages/admin/AdminCategories";
import AdminAddCategory from "./Pages/admin/AdminAddCategory";
import AdminUsers from "./Pages/admin/AdminUsers";
import AddUsers from "./Pages/admin/AddUsers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000, //cache expiry time
    },
  },
});

function App() {
  const isUserLoggedIn = AuthServices.isUserLoggedIn();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<FrontendLayout />}>
            <Route path={UNAUTHENTICATED_ROUTES.HOME} element={<Home />} />
            <Route
              path={UNAUTHENTICATED_ROUTES.POST_DETAIL}
              element={<PostDetail />}
            />
            <Route
              path={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL}
              element={<CategoryDetail />}
            />
            <Route
              path={UNAUTHENTICATED_ROUTES.SEARCH_DETAIL}
              element={<SearchDetail />}
            />

            <Route
              path={UNAUTHENTICATED_ROUTES.REGISTER}
              element={<Register />}
            />
            <Route path={UNAUTHENTICATED_ROUTES.LOGIN} element={<Login />} />
          </Route>

          {isUserLoggedIn && (
            <Route element={<AdminLayout />}>
              <Route
                path={AUTHENTICATED_ROUTE.DASHBOARD}
                element={<Dashboard />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.CATEGORIES}
                element={<AdminCategories />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.ADD_CATEGORY}
                element={<AdminAddCategory />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.EDIT_CATEGORY}
                element={<AdminAddCategory />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.USERS}
                element={<AdminUsers />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.ADD_USERS}
                element={<AddUsers />}
              />
              <Route
                path={AUTHENTICATED_ROUTE.EDIT_USER}
                element={<AddUsers />}
              />
            </Route>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
