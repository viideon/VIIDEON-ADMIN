import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import {Image} from "@material-ui/icons";
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
import UserList from "views/Users/UserList";
import PublicAssets from "views/PublicAssets/PublicAssets";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/publicAssets",
    name: "Public Assets",
    icon: Image,
    component: PublicAssets,
    layout: "/admin",
  },
];

export default dashboardRoutes;
