export enum AppRoutesPublic {
    AUTH='auth',
    REDIRECT='redir'
};
export enum AppRoutesAuth {
    MAIN='main',
    REDIRECT='redir'
};


export const RoutePathPublic: Record<AppRoutesPublic,string> = {
    [AppRoutesPublic.AUTH]:'auth',
    [AppRoutesPublic.REDIRECT]:'*',
}
export const RoutePathAuth: Record<AppRoutesAuth,string> = {
    [AppRoutesAuth.MAIN]:'main',
    [AppRoutesAuth.REDIRECT]:'*',
}