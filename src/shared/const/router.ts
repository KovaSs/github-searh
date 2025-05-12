export enum AppRoutes {
	REPOSITORY_INFO = 'repository',
	SIGNIN = 'signin',
	MAIN = 'main',
	// last
	NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSignIn = () => `/${AppRoutes.SIGNIN}`;
export const getRepositoryInfo = (owner: string, name: string) => `/${AppRoutes.REPOSITORY_INFO}/${owner}/${name}`;

export const mainPagePath = getRouteMain();
export const signinPagePath = getRouteSignIn();
export const repositoryInfoPath = getRepositoryInfo(':owner', ':name');

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
	[signinPagePath]: AppRoutes.SIGNIN,
	[mainPagePath]: AppRoutes.MAIN,
	[repositoryInfoPath]: AppRoutes.REPOSITORY_INFO,
};
