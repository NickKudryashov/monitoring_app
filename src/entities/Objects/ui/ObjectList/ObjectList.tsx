import { ReactElement, useCallback, useEffect, useMemo } from "react";
import { useGetSelectedUserObject } from "../../selectors/getAllObjects";
import { Select } from "@/shared/ui/Select/Select";
import { useUserObjectActions } from "../../reducers/reducers";
import { getAllObjects } from "../../api/api";

interface ObjectListProps {
    onSelectObjectProp?: (objectID: number) => void;
    selectedObject?: number;
}

export const ObjectList = (props: ObjectListProps): ReactElement => {
    const { selectedObject, onSelectObjectProp } = props;
    const { data: objects } = getAllObjects({});
    const objectSelectedState = useGetSelectedUserObject();

    useEffect(() => {
        if (selectedObject && onSelectObjectProp) {
            onSelectObjectProp(selectedObject);
        }
    }, [selectedObject, objects]);
    const onSelectObject = useCallback(
        (val: string) => {
            onSelectObjectProp?.(Number(val));
        },
        [onSelectObjectProp],
    );
    const options = useMemo(
        () =>
            objects
                ? [
                      { value: "0", content: "" },
                      ...objects.map((el) => ({
                          value: String(el.id),
                          content: el.address,
                      })),
                  ]
                : [{ value: "0", content: "" }],
        [objects],
    );
    return (
        <Select
            onChange={onSelectObject}
            label="Объекты"
            options={options}
            value={String(objectSelectedState?.id)}
        />
    );
};
