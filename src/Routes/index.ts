import { Authroutes } from "@/Modules/Auth/Auth.route";
import { SectionContentRoutes } from "@/Modules/SectionContent/SectionContent.route";
import { UserRoutes } from "@/Modules/User/User.route";
import { WebpageRoutes } from "@/Modules/Webpage/Webpage.route";
import { WebpageSectionRoutes } from "@/Modules/WebpageSection/WebpageSection.route";
import { WebsiteRoutes } from "@/Modules/Website/Website.route";
import { WebsiteThemeRoutes } from "@/Modules/WebsiteTheme/WebsiteTheme.route";
import { Router } from "express";

const routes = Router();

export const moduleRoute = [
  {
    path: "/auth",
    route: Authroutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/websites",
    route: WebsiteRoutes,
  },
  {
    path: "/",
    route: WebpageRoutes,
  },
  {
    path: "/",
    route: WebpageSectionRoutes,
  },
  {
    path: "/",
    route: SectionContentRoutes,
  },
  {
    path: "/",
    route: WebsiteThemeRoutes,
  },
];

moduleRoute.forEach((Route) => routes.use(Route.path, Route.route));

export default routes;
