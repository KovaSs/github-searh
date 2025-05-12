import { AppRoutes, signinPagePath, repositoryInfoPath, mainPagePath } from "@/shared/const/router";
import { Repositories } from "@/pages/Repositories";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Repository } from "@/pages/Repository";
import { Signin } from "@/pages/SignIn";

import type { RouteProps } from '@/app/types/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    element: <Repositories />,
    path: mainPagePath,
  },
  [AppRoutes.REPOSITORY_INFO]: {
    element: <Repository />,
    path: repositoryInfoPath,
  },
  [AppRoutes.SIGNIN]: {
    element: <Signin />,
    path: signinPagePath,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: "*",
  },
};
