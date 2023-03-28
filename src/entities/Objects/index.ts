import { objectReducer } from "./reducers/reducers";
import { objectsAllRequest,objectsDelRequest } from "./reducers/actionCreator";
import { ObjectListItem } from "./ui/ObjectListItem/ObjectListItem";
import { ObjectCard } from "./ui/ObjectCard/ObjectCard";
import { objectSlice } from "./reducers/reducers";
import { ObjectResponse } from "./types/types";
import { ObjectDetail } from "./ui/ObjectDetail/ObjectDetail";
import { ObjectItem,objectState } from "./reducers/reducers";
export {objectReducer,objectsAllRequest,ObjectListItem,ObjectCard,objectSlice,ObjectResponse,ObjectDetail,ObjectItem,objectsDelRequest,objectState};