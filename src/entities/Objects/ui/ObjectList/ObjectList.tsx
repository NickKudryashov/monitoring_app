import { ReactElement, useCallback, useEffect, useState } from "react";
import cls from "./ObjectList.module.scss";
import { useSelector } from "react-redux";
import {
    getAllObjects,
    getSelectedUserObject,
} from "entities/Objects/selectors/getAllObjects";
import { useAppDispatch } from "shared/hooks/hooks";
import { objectsAllRequest } from "entities/Objects/reducers/actionCreator";
import { Select } from "shared/ui/Select/Select";
import { userObjectActions } from "entities/Objects/reducers/reducers";

interface ObjectListProps {
    onSelectObject?: (objectID: number) => void;
    selectedObject?: number;
}

export const ObjectList = (props: ObjectListProps): ReactElement => {
    const { selectedObject } = props;
    const { objects } = useSelector(getAllObjects);
    const objectSelectedState = useSelector(getSelectedUserObject);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(objectsAllRequest());
        return () => {
            dispatch(userObjectActions.clearSelectObject());
        };
    }, []);
    useEffect(() => {
        if (selectedObject) {
            dispatch(userObjectActions.selectObject(selectedObject));
        }
    }, [selectedObject, objects]);
    const onSelectObject = useCallback(
        (val: string) => {
            dispatch(userObjectActions.selectObject(Number(val)));
        },
        [dispatch]
    );
    const options = [
        { value: "0", content: "" },
        ...objects.map((el) => ({
            value: String(el.id),
            content: el.address,
        })),
    ];
    return (
        // <select onChange={(e) => onSelectObject(Number(e.target.value))}>
        //     <option value={null}>Выберите объект</option>
        //     {objects?.map((el) => (
        //         <option key={el.id} value={el.id}>
        //             {el.address}
        //         </option>
        //     ))}
        // </select>
        <Select
            onChange={onSelectObject}
            label="Объекты"
            options={options}
            value={String(objectSelectedState?.id)}
        />
    );
};
