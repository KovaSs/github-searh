import { lazy } from 'react';

export const RepositoriesAsync = lazy(() => import('./Repositories').then((module) => ({ default: module.Repositories })));
