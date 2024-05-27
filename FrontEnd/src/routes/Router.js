import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const UserFullLayout = lazy(() => import("../userlayouts/UserFullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));


/***** User Pages ****/
const UserStarter = lazy(() => import("../views/UserStarter.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "starter", element: <Starter /> },
      { path: "about", element: <About /> },
      { path: "alerts", element: <Alerts /> },
      { path: "badges", element: <Badges /> },
      { path: "buttons", element: <Buttons /> },
      { path: "cards", element: <Cards /> },
      { path: "grid", element: <Grid /> },
      { path: "table", element: <Tables /> },
      { path: "forms", element: <Forms /> },
      { path: "breadcrumbs", element: <Breadcrumbs /> },
    ],
  },
  {
    path: "/user",
    element: <UserFullLayout />,
    children: [
      { path: "userstarter", element: <UserStarter /> },
    ],
  },
];

export default ThemeRoutes;