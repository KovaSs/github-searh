import { lazy } from 'react';

export const RepositoryAsync = lazy(() => import('./Repository').then((module) => ({ default: module.Repository })));
