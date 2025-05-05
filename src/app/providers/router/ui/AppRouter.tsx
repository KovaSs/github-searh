import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import type { RouteProps } from '@/app/types/router';

import { routeConfig } from '../config/routeConfig';

const AppRouter: React.FC = () => {
	const renderWithWrapper = useCallback((route: RouteProps) => {
		const element = <Suspense fallback={<div />}>{route.element}</Suspense>;
		return <Route key={route.path} path={route.path} element={element} />;
	}, []);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
