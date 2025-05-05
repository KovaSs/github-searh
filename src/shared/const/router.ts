export enum AppRoutes {
    MAIN = 'main',
    REPOSITORY_DETAILS = 'repository',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRepositoryInfo = (owner: string, name: string) => `/repository/${owner}/${name}`;


export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRepositoryInfo(':owner', ':name')]: AppRoutes.REPOSITORY_DETAILS,
};

console.log(AppRouteByPathPattern)
