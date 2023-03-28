import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectListItem.module.scss";
import type { ObjectResponse } from "entities/Objects/types/types";
import type { PropsWithChildren } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { objectSlice } from "entities/Objects/reducers/reducers";
import { getObjectById } from "entities/Objects/helpers/objectHelper";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface ObjectListItemProps {
 className?: string;
 id:number;
 onObjectClick:(obj:ObjectResponse)=>void;
 Component?:()=>React.ReactNode;
}

export function ObjectListItem(props: PropsWithChildren<ObjectListItemProps>) {
    const { className,children,id,onObjectClick,Component } = props;
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const dispatch = useAppDispatch();
    const currentObject = getObjectById(id);
    const onClickHandler = (obj:ObjectResponse) => {
        // dispatch(objectSlice.actions.expand(obj.id));
        dispatch(objectSlice.actions.openObj(obj.id));
        onObjectClick(obj);
    };
    const mods:Record<string,boolean> = {
        [cls.selected]:currentObject.expanded
    };
    return (
        <div className={classNames(cls.ObjectListItem,mods,[className])}>
            
            {objects.map(obj=>obj.id===id && 
            <div key={obj.id} className={cls.nested}>
                <div className={cls.menu}>
                    <div onClick={()=>onClickHandler(obj)}>{obj.name}  </div>
                    <div onClick={e=>e.stopPropagation()}>{Component()}</div>
                </div>
                {obj.expanded && children}
            </div>
            )}

        </div>
    );
}