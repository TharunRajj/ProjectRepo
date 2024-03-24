import UserList from "../src/Components/ListUsers/UserList";
import UserDetails from "./Components/UserDetails/UserDetails";
import { loader as userDetailsLoader } from "./Components/UserDetails/UserDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
const App = () => {
  const router = createBrowserRouter([
    {
      index: true,
      errorElement: <ErrorPage />,
      element: <UserList />,
    },
    {
      path: "/users/:id",
      element: <UserDetails />,
      errorElement: <ErrorPage />,
      loader: userDetailsLoader,
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
