import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ObjectSubcatEditPage.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { objectsAllRequest } from "@/entities/Objects";
import { PageHeader } from "../PageHeader/PageHeader";
import EditIcon from "@/shared/assets/icons/SubcatEditIcon.svg";
import DeleteIcon from "@/shared/assets/icons/SubcatDeleteIcon.svg";
import HeatIcon from "@/shared/assets/icons/SystemHeatNodeIcon.svg";
import ElectroIcon from "@/shared/assets/icons/SystemElectroNodeIcon.svg";
import PumpIcon from "@/shared/assets/icons/SystemPumpNodeIcon.svg";
import AutoIcon from "@/shared/assets/icons/SystemAutomaticNodeIcon.svg";
import {
    SubcategoryAnswer,
    addNewSubcategory,
    deleteSubcat,
    getObjectSubcategoryData,
    toggleSubcat,
} from "@/entities/ObjectSubCategory";
import { DropdownMenu } from "@/shared/ui/DropdownMenu/DropdownMenu";
import LittlePlusIcon from "@/shared/assets/icons/LittlePlusIcon.svg";
interface ObjectSubcatEditPageProps {
    className?: string;
}

const TEMP = [
    "heat_energy_node",
    "auto_node",
    "pump_station_node",
    "electro_energy_node",
] as const;
type TEMP = keyof typeof TEMP;
const TEMP_VERB = {
    heat_energy_node: "СИСТЕМА ИТП",
    auto_node: "ВЕНТИЛЯЦИЯ/ДЫМОХОДЫ",
    pump_station_node: "СИСТЕМА ГВС/ХВС",
    electro_energy_node: "ЭЛЕКТРИКА",
} as const;
const TEMP_SUB_VERB = {
    heat_energy_node: "УЗЕЛ УЧЕТА ТЕПЛОВОЙ ЭНЕРГИИ",
    auto_node: "АСУТП",
    pump_station_node: "Насосная станиця",
    electro_energy_node: "ВРУ",
} as const;
// interface ObjectSubcatsByType {
//     [K in typeof TEMP]:string;
// }

const mapIcon = (subcat_type: typeof TEMP[number]) => {
    switch (subcat_type) {
        case "auto_node":
            return <AutoIcon />;
        case "electro_energy_node":
            return <ElectroIcon />;
        case "heat_energy_node":
            return <HeatIcon />;
        case "pump_station_node":
            return <PumpIcon />;
    }
};

type ObjAll = { [K in typeof TEMP[number]]: SubcategoryAnswer[] };
type Obj = {};
const ObjectSubcatEditPage = (
    props: PropsWithChildren<ObjectSubcatEditPageProps>
) => {
    const { className } = props;
    const [objID, setObjId] = useState("");
    const dispatch = useAppDispatch();
    const [toggled, setToggled] = useState(false);
    const [deleteMutation] = deleteSubcat();
    const [toggleMutation] = toggleSubcat();
    const [addSubcat] = addNewSubcategory();
    const { data: objectData, isLoading: objectIsLoading } =
        getObjectSubcategoryData(Number(objID));
    useEffect(() => {
        dispatch(objectsAllRequest());
    }, []);

    const addSubcatHandler = (subtype: keyof typeof TEMP_SUB_VERB) => {
        const namePostfix =
            objectData?.data?.filter((sys) => sys.subcategory_type === subtype)
                .length ?? 1;
        addSubcat({
            name: `${TEMP_SUB_VERB[subtype]} №${namePostfix}`,
            subcategory_type: subtype,
            user_object: Number(objID),
        });
    };

    return (
        <VFlexBox
            alignItems="center"
            className={classNames(cls.ObjectSubcatEditPage, {}, [])}
        >
            <VFlexBox width="90%" align="space-between" alignItems="center">
                <PageHeader objID={objID} setObjId={setObjId} />
                <HFlexBox
                    className={cls.cardBox}
                    align="space-between"
                    height="90%"
                >
                    {TEMP.map((subtype) => (
                        <VFlexBox
                            alignItems="center"
                            align="space-between"
                            className={cls.systemBox}
                            height="45%"
                            width="32%"
                            key={subtype}
                        >
                            <HFlexBox
                                height="10%"
                                align="center"
                                alignItems="center"
                                className={cls.cardTitle}
                            >
                                {TEMP_VERB[subtype]}
                            </HFlexBox>
                            <VFlexBox alignItems="center" height="85%">
                                <HFlexBox
                                    height="30%"
                                    align="center"
                                    alignItems="center"
                                >
                                    <DropdownMenu
                                        width="95%"
                                        header="добавить систему"
                                    >
                                        <HFlexBox
                                            alignItems="center"
                                            align="space-around"
                                        >
                                            <HFlexBox
                                                gap="10px"
                                                alignItems="center"
                                                width="70%"
                                            >
                                                {mapIcon(subtype)}
                                                <p>{TEMP_VERB[subtype]}</p>
                                            </HFlexBox>
                                            <HFlexBox
                                                alignItems="center"
                                                align="space-around"
                                                className={cls.systemCountField}
                                                width="10%"
                                            >
                                                <p>
                                                    {objectData?.data.filter(
                                                        (sys) =>
                                                            sys.subcategory_type ===
                                                            subtype
                                                    )?.length ?? 0}
                                                </p>
                                                <LittlePlusIcon
                                                    onClick={() =>
                                                        addSubcatHandler(
                                                            subtype
                                                        )
                                                    }
                                                />
                                            </HFlexBox>
                                        </HFlexBox>
                                    </DropdownMenu>
                                </HFlexBox>
                                {objectData &&
                                    objectData.data &&
                                    objectData.data.filter(
                                        (sys) =>
                                            sys.subcategory_type === subtype
                                    ) && (
                                        <HFlexBox height="5%">
                                            <HFlexBox width="60%" />
                                            <HFlexBox
                                                width="35%"
                                                align="space-between"
                                            >
                                                <p
                                                    className={
                                                        cls.systemHeaders
                                                    }
                                                >
                                                    вкл/выкл систему
                                                </p>
                                                <p
                                                    className={
                                                        cls.systemHeaders
                                                    }
                                                >
                                                    редактировать
                                                </p>
                                                <p
                                                    className={
                                                        cls.systemHeaders
                                                    }
                                                >
                                                    удалить
                                                </p>
                                            </HFlexBox>
                                        </HFlexBox>
                                    )}
                                {objectData &&
                                    objectData.data &&
                                    objectData.data
                                        .filter(
                                            (sys) =>
                                                sys.subcategory_type === subtype
                                        )
                                        .map((el) => (
                                            <HFlexBox
                                                height="12%"
                                                className={cls.systemLine}
                                                alignItems="center"
                                                align="center"
                                                width={"95%"}
                                                key={el.id}
                                            >
                                                <HFlexBox
                                                    width="60%"
                                                    alignItems="center"
                                                    gap="7px"
                                                >
                                                    {mapIcon(subtype)}
                                                    {el.name}
                                                </HFlexBox>
                                                <HFlexBox
                                                    width="35%"
                                                    align="space-between"
                                                    alignItems="center"
                                                >
                                                    <HFlexBox
                                                        width="33%"
                                                        height="40%"
                                                    >
                                                        <input
                                                            className={
                                                                cls.switchCheckbox
                                                            }
                                                            id={`react-switch-new${el.id}`}
                                                            type="checkbox"
                                                            checked={el.enabled}
                                                            onChange={(e) =>
                                                                toggleMutation({
                                                                    id: el.id,
                                                                    enabled:
                                                                        !el.enabled,
                                                                })
                                                            }
                                                        />
                                                        <label
                                                            className={
                                                                cls.switchLabel
                                                            }
                                                            htmlFor={`react-switch-new${el.id}`}
                                                        >
                                                            <span
                                                                className={
                                                                    cls.switchButton
                                                                }
                                                            />
                                                        </label>
                                                    </HFlexBox>
                                                    <EditIcon
                                                        className={cls.icon}
                                                        width={"15%"}
                                                    />
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            deleteMutation({
                                                                id: el.id,
                                                            })
                                                        }
                                                        className={cls.icon}
                                                        width={"15%"}
                                                    />
                                                </HFlexBox>
                                            </HFlexBox>
                                        ))}
                            </VFlexBox>
                        </VFlexBox>
                    ))}
                </HFlexBox>
            </VFlexBox>
        </VFlexBox>
    );
};

export default ObjectSubcatEditPage;
