import { getObjectSubcategoryData } from "entities/ObjectSubCategory/api/api";
import { getSelectedSubcategory } from "entities/ObjectSubCategory/model/selectors/selectors";
import { objSubCategoryActions } from "entities/ObjectSubCategory/model/slice/subcatSlice";
import { SubcatTypes } from "entities/ObjectSubCategory/model/types/ObjectSubCategorySchema";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { LoaderCircle } from "shared/ui/LoaderCircle/LoaderCircle";
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
    props: SubcategoryListProps
): ReactElement => {
    const { objectID, preselectedSubcategory } = props;
    const selectedSubcat = useSelector(getSelectedSubcategory);
    const dispatch = useAppDispatch();
    const { data: subcatData, isLoading: isLoadingSubcat } =
        getObjectSubcategoryData(objectID, {
            skip: !objectID,
        });

    useEffect(() => {
        dispatch(objSubCategoryActions.selectSubcategory(null));
    }, [objectID]);
    useEffect(() => {
        const subcat = subcatData?.data?.filter(
            (el) => el.id === preselectedSubcategory
        );
        if (subcat) {
            dispatch(objSubCategoryActions.selectSubcategory(subcat[0]));
        }
    }, [dispatch, preselectedSubcategory, subcatData?.data]);

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
            dispatch(
                objSubCategoryActions.selectSubcategory(selectedSubcatByData)
            );
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
