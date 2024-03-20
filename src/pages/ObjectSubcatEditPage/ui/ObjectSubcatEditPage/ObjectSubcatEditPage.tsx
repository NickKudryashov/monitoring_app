import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ObjectSubcatEditPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { useAppDispatch } from "shared/hooks/hooks";
import { objectsAllRequest } from "entities/Objects";
import { getObjectSubcategoryData } from "features/ObjectCategoryCardView/api/objectSubcategorysApi";
import { SubcategoryAnswer } from "features/AddCategory/api/api";
import { PageHeader } from "../PageHeader/PageHeader";
import EditIcon from "shared/assets/icons/SubcatEditIcon.svg";
import DeleteIcon from "shared/assets/icons/SubcatDeleteIcon.svg";
import HeatIcon from "shared/assets/icons/SystemHeatNodeIcon.svg";
import ElectroIcon from "shared/assets/icons/SystemElectroNodeIcon.svg";
import PumpIcon from "shared/assets/icons/SystemPumpNodeIcon.svg";
import AutoIcon from "shared/assets/icons/SystemAutomaticNodeIcon.svg";

interface ObjectSubcatEditPageProps {
    className?: string;
   }

const TEMP = ["heat_energy_node","auto_node","pump_station_node","electro_energy_node",] as const;
const TEMP_VERB = {"heat_energy_node":"СИСТЕМА ИТП","auto_node":"ВЕНТИЛЯЦИЯ/ДЫМОХОДЫ","pump_station_node":"СИСТЕМА ГВС/ХВС","electro_energy_node":"ЭЛЕКТРИКА"} as const;
// interface ObjectSubcatsByType {
//     [K in typeof TEMP]:string;
// }

const mapIcon = (subcat_type:typeof TEMP[number])=>{
    switch (subcat_type) {
    case "auto_node":
        return <AutoIcon/>;
    case "electro_energy_node":
        return <ElectroIcon/>;
    case "heat_energy_node":
        return <HeatIcon/>;
    case "pump_station_node":
        return <PumpIcon/>;
    }   
};

type ObjAll =  {[K in typeof TEMP[number]]:SubcategoryAnswer[]} 
type Obj = {}
const ObjectSubcatEditPage = (props: PropsWithChildren<ObjectSubcatEditPageProps>) => {
    const { className } = props;
    const [objID,setObjId] =useState("");
    const dispatch = useAppDispatch();
    const [toggled,setToggled] = useState(false);
    const {data:objectData,isLoading:objectIsLoading} = getObjectSubcategoryData(Number(objID));
    useEffect(()=>{
        dispatch(objectsAllRequest());
    },[]);

    const subcatsByType = useMemo(()=>{
        const result:Partial<ObjAll> = {};
        if (objectIsLoading || !objectData || objectData.data===undefined) {
            return result;
        }
        for (const subcat of objectData.data) {
            console.log("cycle");
            result[subcat.subcategory_type] =  result[subcat.subcategory_type] ?  [...result[subcat.subcategory_type],subcat] : [subcat,];
        }
        console.log(result);
        return result;
    },[objectData, objectIsLoading]);

    return (
        <VFlexBox alignItems="center"  className={classNames(cls.ObjectSubcatEditPage,{},[])}>
            <VFlexBox width="90%" align="space-between" alignItems="center">
                
                <PageHeader objID={objID} setObjId={setObjId} />
                <HFlexBox className={cls.cardBox} align="space-between" height="90%">
                    {TEMP.map((subtype)=>
                        <VFlexBox alignItems="center" align="space-between" className={cls.systemBox} height="45%" width="32%"  key={subtype}>
                            <HFlexBox height="10%" align="center" alignItems="center" className={cls.cardTitle}>
                                {TEMP_VERB[subtype]}
                            </HFlexBox>
                            <VFlexBox alignItems="center" height="90%">
                                {subcatsByType[subtype] && 
                                <HFlexBox height="5%">
                                    <HFlexBox width="60%"/>
                                    <HFlexBox width="35%" align="space-between">
                                        <p className={cls.systemHeaders}>вкл/выкл систему</p>
                                        <p className={cls.systemHeaders}>редактировать</p>
                                        <p className={cls.systemHeaders}>удалить</p>
                                    </HFlexBox>
                                </HFlexBox>
                                }
                                {
                                    subcatsByType[subtype] && subcatsByType[subtype].map((el)=>
                                        <HFlexBox height="12%" className={cls.systemLine} alignItems="center" align="center" width={"95%"} key={el.id}>
                                            <HFlexBox width="60%" alignItems="center" gap="7px">
                                                {mapIcon(subtype)}
                                                {el.name}
                                            </HFlexBox>
                                            <HFlexBox width="35%" align="space-between" alignItems="center">
                                                <HFlexBox width="33%" height="40%">
                                                    <input
                                                        className={cls.switchCheckbox}
                                                        id={"react-switch-new"}
                                                        type="checkbox"
                                                        checked={toggled}
                                                        onChange={(e)=>setToggled(e.target.checked)}
                                                    />
                                                    <label
                                                        className={cls.switchLabel}
                                                        htmlFor={"react-switch-new"}
                                                    >
                                                        <span className={cls.switchButton} />
                                                    </label>
                                                </HFlexBox>
                                                <EditIcon className={cls.icon} width={"15%"}/>
                                                <DeleteIcon className={cls.icon} width={"15%"}/>
                                            </HFlexBox>
                                        </HFlexBox>
                                    )
                                }
                            </VFlexBox>
                            
                        </VFlexBox>
                    )}
                </HFlexBox>
            </VFlexBox>
        </VFlexBox>
    );
};
   
export default ObjectSubcatEditPage;