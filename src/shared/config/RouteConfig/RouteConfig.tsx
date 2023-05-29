export enum AppRoutesPublic {
    AUTH="auth",
    REDIRECT="redir"
}
export enum AppRoutesAuth {
    MAIN="main",
    CATEGORY="category",
    OBJECT="object",
    HEATNODE="heatnode",
    HEATDEVICE="heatdevice",
    ELECTRONODE="electronode",
    ELECTRODEVICE="electrodevice",
    ADMINISTRATION="administration",
    GENERALINFO="general",
    MOCK="mock",
    REDIRECT="redir",
}


export const RoutePathPublic: Record<AppRoutesPublic,string> = {
    [AppRoutesPublic.AUTH]:"auth",
    [AppRoutesPublic.REDIRECT]:"*",
};
export const RoutePathAuth: Record<AppRoutesAuth,string> = {
    [AppRoutesAuth.CATEGORY]:"/category/",
    [AppRoutesAuth.OBJECT]:"/object/",
    [AppRoutesAuth.HEATNODE]:"/heatnode/",
    [AppRoutesAuth.HEATDEVICE]:"/heatdevice/",
    [AppRoutesAuth.ELECTRONODE]:"/electronode/",
    [AppRoutesAuth.ELECTRODEVICE]:"/electrodevice/",
    [AppRoutesAuth.GENERALINFO]:"/general/",
    [AppRoutesAuth.ADMINISTRATION]:"/administration/",
    [AppRoutesAuth.MOCK]:"/mock/",
    [AppRoutesAuth.MAIN]:"/",
    [AppRoutesAuth.REDIRECT]:"*",
};