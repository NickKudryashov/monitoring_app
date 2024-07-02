import { getObjectSubcategoryData } from "entities/ObjectSubCategory/api/api";
import { SubcatTypes } from "entities/ObjectSubCategory/model/types/ObjectSubCategorySchema";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { LoaderCircle } from "shared/ui/LoaderCircle/LoaderCircle";
import { Select } from "shared/ui/Select/Select";
interface SubcategorySelectArgs {
    id: number;
    subcat_type: SubcatTypes;
}
interface SubcategoryListProps {
    objectID: number;
    setSelectedSubcategory: (args: SubcategorySelectArgs) => void;
    preselectedSubcategory?: SubcategorySelectArgs;
}
export const SubcategoryListByObject = (
    props: SubcategoryListProps
): ReactElement => {
    const { objectID, setSelectedSubcategory, preselectedSubcategory } = props;
    const [subcatVal, setSubcatVal] = useState(
        String(preselectedSubcategory?.id) || null
    );
    const { data: subcatData, isLoading: isLoadingSubcat } =
        getObjectSubcategoryData(objectID, {
            skip: !objectID,
        });

    useEffect(() => {
        return () => {
            setSelectedSubcategory(null);
        };
    }, [objectID]);
    useEffect(() => {
        if (preselectedSubcategory === undefined) {
            setSelectedSubcategory(null);
        } else {
            setSelectedSubcategory(preselectedSubcategory);
        }
    }, []);

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
        setSubcatVal(val);
        const [selectedSubcat] =
            subcatData?.data.filter((el) => el.id === Number(val)) || [];
        if (selectedSubcat) {
            setSelectedSubcategory({
                id: selectedSubcat.id,
                subcat_type: selectedSubcat.subcategory_type,
            });
        }
    };

    return (
        // <select onChange={onSelectChangeHandler}>
        //     <option value={null}>Выберите систему</option>
        //     {objectID &&
        //         !isLoadingSubcat &&
        //         subcatData.data.map((el) => (
        //             <option key={el.id} value={String(el.id)}>
        //                 {el.name}
        //             </option>
        //         ))}
        //     {objectID && isLoadingSubcat && <LoaderCircle />}
        // </select>
        <Select
            onChange={onSelectChangeHandler}
            options={options}
            label="Системы"
            value={subcatVal}
        />
    );
};
