export enum AppRoutesPublic {
    AUTH="auth",
    REG="reg",
    REDIRECT="redir",
}
export enum AppRoutesAuth {
    MAIN="main",
    CATEGORY="category",
    OBJECT="object",
    MAP="map",
    DETAIL_OBJECTS="detail_objects",
    HEATDEVICE="heatdevice",
    ELECTRODEVICE="electrodevice",
    PUMPDEVICE="pumpdevice",
    ADMINISTRATION="administration",
    GENERALINFO="general",
    SETTINGS="settings",
    SUBCAT="subcat",
    HEAT_SUBCAT="heat_subcat",
    PUMP_SUBCAT="pump_subcat",
    AUTO_SUBCAT="auto_subcat",
    ELECTRO_SUBCAT="el_subcat",
    MOCK="mock",
    REDIRECT="redir",
}


export const RoutePathPublic: Record<AppRoutesPublic,string> = {
    [AppRoutesPublic.AUTH]:"/auth/",
    [AppRoutesPublic.REG]:"/reg/",
    [AppRoutesPublic.REDIRECT]:"*",
};
export const RoutePathAuth: Record<AppRoutesAuth,string> = {
    [AppRoutesAuth.CATEGORY]:"/category/",
    [AppRoutesAuth.PUMPDEVICE]:"/pump/",
    [AppRoutesAuth.OBJECT]:"/object/",
    [AppRoutesAuth.DETAIL_OBJECTS]:"/detail_objects",
    [AppRoutesAuth.HEATDEVICE]:"/heatdevice/",
    [AppRoutesAuth.ELECTRODEVICE]:"/electrodevice/",
    [AppRoutesAuth.GENERALINFO]:"/general/",
    [AppRoutesAuth.ADMINISTRATION]:"/administration/",
    [AppRoutesAuth.SETTINGS]:"/settings/",
    [AppRoutesAuth.SUBCAT]:"/subcategory/",
    [AppRoutesAuth.HEAT_SUBCAT]:"/heat_subcategory/",
    [AppRoutesAuth.PUMP_SUBCAT]:"/pump_subcategory/",
    [AppRoutesAuth.AUTO_SUBCAT]:"/auto_subcategory/",
    [AppRoutesAuth.ELECTRO_SUBCAT]:"/electro_subcategory/",
    [AppRoutesAuth.MAP]:"/map",
    [AppRoutesAuth.MOCK]:"/mock/",
    [AppRoutesAuth.MAIN]:"/",
    [AppRoutesAuth.REDIRECT]:"*",
};