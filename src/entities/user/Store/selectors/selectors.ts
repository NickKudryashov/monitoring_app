import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getIsAuth = (state:StateSchema)=>state.user.isAuth;
export const getVersion = (state:StateSchema)=>state.user.version;
export const getUserName = (state:StateSchema)=>state.user?.userdata?.name;