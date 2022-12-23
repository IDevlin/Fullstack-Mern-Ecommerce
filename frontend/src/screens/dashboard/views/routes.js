import DashboardScreen from "../DashboardScreen";
import ProductListScreen from "../ProductListScreen";
import UserListScreen from "../UserListScreen";

const  routes = [
    {
      path: "dashboard",
      name: "Dashboard",
      icon: "bx bxs-dashboard",
      component: DashboardScreen,
      layout: "/admin"
    },
    {
      path: "products",
      name: "Products",
      icon: "bx bxl-product-hunt",
      component: ProductListScreen,
      layout: "/admin"
    },
    {
      path: "users",
      name: "Users",
      icon: "bx bxs-user-circle",
      component: UserListScreen,
      layout: "/admin"
    },
  ];
  export default routes;