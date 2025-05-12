import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import type { RouteProps } from '@/app/types/router';
import { mainPagePath } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';

import { routeConfig } from '../config/routeConfig';

import { ProtectedRoute } from './ProtectedRoute';

const AppRouter: React.FC = () => {
	const renderWithWrapper = useCallback((route: RouteProps) => {
		const element = <Suspense fallback={<div />}>{route.element}</Suspense>;
		return <Route key={route.path} path={route.path} element={element} />;
	}, []);

	return (
		<Routes>
			<Route path={mainPagePath} element={<ProtectedRoute />}>
				{Object.values(routeConfig).map(renderWithWrapper)}
			</Route>
		</Routes>
	);
};

export default memo(AppRouter);
