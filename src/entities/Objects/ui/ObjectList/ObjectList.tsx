import { ReactElement, useEffect } from "react";
import cls from "./ObjectList.module.scss";
import { useSelector } from "react-redux";
import { getAllObjects } from "entities/Objects/selectors/getAllObjects";
import { useAppDispatch } from "shared/hooks/hooks";
import { objectsAllRequest } from "entities/Objects/reducers/actionCreator";
import { Select } from "shared/ui/Select/Select";

interface ObjectListProps {
    onSelectObject: (objectID: number) => void;
}

export const ObjectList = (props: ObjectListProps): ReactElement => {
    const { onSelectObject } = props;
    const { objects } = useSelector(getAllObjects);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(objectsAllRequest());
    }, []);
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
            onChange={(val) => onSelectObject(Number(val))}
            label="Объекты"
            options={options}
        />
    );
};
