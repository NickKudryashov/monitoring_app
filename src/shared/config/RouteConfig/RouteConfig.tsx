export enum AppRoutes {
    MAIN='main',
    AUTH='auth'
};

export const RoutePath: Record<AppRoutes,string> = {
    [AppRoutes.MAIN]:'/',
    [AppRoutes.AUTH]:'auth'
}