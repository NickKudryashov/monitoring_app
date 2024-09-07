import { getObjectSubcategoryData } from "../../api/api";
import { useGetSelectedSubcategory } from "../../model/selectors/selectors";
import { useObjSubcatActions } from "../../model/slice/subcatSlice";
import { SubcatTypes } from "../../model/types/ObjectSubCategorySchema";
import { ReactElement, useEffect, useMemo } from "react";
import { Select } from "shared/ui/Select/Select";
interface SubcategorySelectArgs {
    id: number;
    subcat_type: SubcatTypes;
}
interface SubcategoryListProps {
    objectID: number;
    setSelectedSubcategory?: (args: SubcategorySelectArgs) => void;
    preselectedSubcategory?: number;
}
export const SubcategoryListByObject = (
    props: SubcategoryListProps,
): ReactElement => {
    const { objectID, preselectedSubcategory } = props;
    const selectedSubcat = useGetSelectedSubcategory();
    const { clearSelection, selectSubcategory } = useObjSubcatActions();
    const { data: subcatData, isLoading: isLoadingSubcat } =
        getObjectSubcategoryData(objectID, {
            skip: !objectID,
        });

    useEffect(() => {
        clearSelection();
    }, [objectID]);
    useEffect(() => {
        const subcat = subcatData?.data?.filter(
            (el) => el.id === preselectedSubcategory,
        );
        if (subcat) {
            selectSubcategory(subcat[0]);
        }
    }, [preselectedSubcategory, subcatData?.data]);

    const options = useMemo(() => {
        let opt = [{ value: "0", content: "" }];
        if (subcatData) {
            opt = [
                ...opt,
                ...subcatData.data.map((el) => ({
                    value: String(el.id),
                    content: el.name,
                })),
            ];
        }
        return opt;
    }, [subcatData]);

    const onSelectChangeHandler = (val: string) => {
        const [selectedSubcatByData] =
            subcatData?.data.filter((el) => el.id === Number(val)) || [];
        if (selectedSubcatByData) {
            selectSubcategory(selectedSubcatByData);
        }
    };

    return (
        <Select
            onChange={onSelectChangeHandler}
            options={options}
            label="Системы"
            value={String(selectedSubcat?.id)}
        />
    );
};
