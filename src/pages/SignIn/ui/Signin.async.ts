import { lazy } from 'react';

export const SigninAsync = lazy(() => import('./Signin').then((module) => ({ default: module.Signin })));
