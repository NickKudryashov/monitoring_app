export enum AppRoutesPublic {
    AUTH="auth",
    REDIRECT="redir"
}
export enum AppRoutesAuth {
    MAIN="main",
    CATEGORY="category",
    OBJECT="object",
    HEATDEVICE="heatdevice",
    ELECTRODEVICE="electrodevice",
    PUMPDEVICE="pumpdevice",
    ADMINISTRATION="administration",
    GENERALINFO="general",
    SUBCAT="subcat",
    MOCK="mock",
    REDIRECT="redir",
}


export const RoutePathPublic: Record<AppRoutesPublic,string> = {
    [AppRoutesPublic.AUTH]:"auth",
    [AppRoutesPublic.REDIRECT]:"*",
};
export const RoutePathAuth: Record<AppRoutesAuth,string> = {
    [AppRoutesAuth.CATEGORY]:"/category/",
    [AppRoutesAuth.PUMPDEVICE]:"/pump/",
    [AppRoutesAuth.OBJECT]:"/object/",
    [AppRoutesAuth.HEATDEVICE]:"/heatdevice/",
    [AppRoutesAuth.ELECTRODEVICE]:"/electrodevice/",
    [AppRoutesAuth.GENERALINFO]:"/general/",
    [AppRoutesAuth.ADMINISTRATION]:"/administration/",
    [AppRoutesAuth.SUBCAT]:"/subcategory/",
    [AppRoutesAuth.MOCK]:"/mock/",
    [AppRoutesAuth.MAIN]:"/",
    [AppRoutesAuth.REDIRECT]:"*",
};