import {
    SubcategoryStatus,
    getObjectSubcategoryData,
} from "entities/ObjectSubCategory";
import { getUserObjectData } from "entities/Objects";
import { getObjectById } from "entities/Objects/helpers/objectHelper";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAPPER } from "shared/lib/helpers/subcategoryTypeMapper";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ObjectMarker.module.scss";
import classNames from "shared/lib/classNames/classNames";
export const ObjectMarker = (props: { id: number }): ReactElement => {
    const { id } = props;
    const { data: userObjectData } = getUserObjectData(id);
    const { data: subcatData } = getObjectSubcategoryData(id);
    const navigate = useNavigate();
    return (
        <VFlexBox gap="7px" className={cls.baloon}>
            <p>{`Адрес: ${userObjectData?.address}`}</p>
            <p>{`Абонент: ${userObjectData?.abonent}`}</p>
            {subcatData?.data.map((el) => (
                <HFlexBox
                    height={"10%"}
                    key={el.id}
                    alignItems="center"
                    align="center"
                    className={classNames(
                        cls.systemRow,
                        {
                            [cls.greymarker]:
                                el.status === SubcategoryStatus.no_answer,
                            [cls.greenmarker]:
                                el.status === SubcategoryStatus.success,
                        },
                        []
                    )}
                >
                    <p
                        onClick={() =>
                            navigate(ROUTE_MAPPER[el.subcategory_type] + el.id)
                        }
                    >
                        {el.name}
                    </p>
                </HFlexBox>
            ))}
        </VFlexBox>
    );
};
