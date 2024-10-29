import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import './i18n';

const Home = lazy(() => import("./pages/Home"));
const Results = lazy(() => import("./pages/Results"));
const Details = lazy(() => import("./pages/Details"));

const Loading = () => <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/results",
        element: (
          <Suspense fallback={<Loading />}>
            <Results />
          </Suspense>
        ),
      },
      {
        path: "/details",
        element: (
          <Suspense fallback={<Loading />}>
            <Details />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
