import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectDetail.module.scss";

import { PropsWithChildren, useEffect } from "react";
import { ObjectResponse } from "entities/Objects/types/types";
import { ObjectItem } from "entities/Objects/reducers/reducers";
import { useAppDispatch } from "shared/hooks/hooks";
import { objectsAllRequest } from "entities/Objects/reducers/actionCreator";
import { Loader } from "shared/ui/Loader/Loader";

interface ObjectDetailProps {
 className?: string;
 obj: ObjectItem;
}

export function ObjectDetail(props: PropsWithChildren<ObjectDetailProps>) {
    const { className,obj,children } = props;
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(objectsAllRequest());
    },[dispatch]);
    return (
        <div className={classNames(cls.ObjectDetail,{},[className])}>
            {
                obj ? <b className={cls.title}>{`${obj.name} общая информация:`}</b> : <Loader/>
            }

            {children}
        </div>
    );
}