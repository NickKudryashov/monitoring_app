import { ReactElement, useCallback, useEffect } from "react";
import cls from "./ObjectList.module.scss";
import { useSelector } from "react-redux";
import {
    getAllObjects,
    getSelectedUserObject,
    useGetAllObjects,
    useGetSelectedUserObject,
} from "../../selectors/getAllObjects";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { objectsAllRequest } from "../../reducers/actionCreator";
import { Select } from "@/shared/ui/Select/Select";
import { useUserObjectActions } from "../../reducers/reducers";

interface ObjectListProps {
    onSelectObject?: (objectID: number) => void;
    selectedObject?: number;
}

export const ObjectList = (props: ObjectListProps): ReactElement => {
    const { selectedObject } = props;
    const objects = useGetAllObjects();
    const objectSelectedState = useGetSelectedUserObject();
    const { clearSelectObject, selectObject } = useUserObjectActions();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(objectsAllRequest());
        return () => {
            clearSelectObject();
        };
    }, []);
    useEffect(() => {
        if (selectedObject) {
            selectObject(selectedObject);
        }
    }, [selectedObject, objects]);
    const onSelectObject = useCallback((val: string) => {
        selectObject(Number(val));
    }, []);
    const options = [
        { value: "0", content: "" },
        ...objects.map((el) => ({
            value: String(el.id),
            content: el.address,
        })),
    ];
    return (
        <Select
            onChange={onSelectObject}
            label="Объекты"
            options={options}
            value={String(objectSelectedState?.id)}
        />
    );
};
