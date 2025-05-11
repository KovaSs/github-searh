import { AppRoutes, getRouteMain, repositoryInfoPath } from "@/shared/const/router";
import { Repositories } from "@/pages/Repositories";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Repository } from "@/pages/Repository";

import type { RouteProps } from '@/app/types/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    element: <Repositories />,
    path: getRouteMain(),
  },
  [AppRoutes.REPOSITORY_DETAILS]: {
    element: <Repository />,
    path: repositoryInfoPath,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    element: <NotFoundPage />,
    path: "*",
  },
};
