import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryView.module.scss";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { SubcategoryAnswer, editSubcatOrder, getObjectSubcategoryData } from "../api/objectSubcategorysApi";
import HeatIcon from "shared/assets/icons/SystemHeatNodeIcon.svg";
import ElectroIcon from "shared/assets/icons/SystemElectroNodeIcon.svg";
import PumpIcon from "shared/assets/icons/SystemPumpNodeIcon.svg";
import AutoIcon from "shared/assets/icons/SystemAutomaticNodeIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { subcatCardSliceActions } from "../model/cardSlice";
interface ObjectCategoryViewProps {
    className?: string;
    adress: string;
    id: number;
}
const IconMapper: any = {
    1: HeatIcon,
    2: ElectroIcon,
    3: AutoIcon,
    4: PumpIcon
};

const ROUTE_MAPPER:Record<string,string> = {
    "heat_energy_node":RoutePathAuth.heat_subcat,
    "auto_node":RoutePathAuth.auto_subcat,
    "pump_station_node":RoutePathAuth.pump_subcat,
    "electro_energy_node":RoutePathAuth.el_subcat,
};


export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className, id, adress } = props;
    const { data, isLoading,refetch } = getObjectSubcategoryData(id);
    useEffect(()=>{
        refetch();
    },[]);
    const [editOrder,{isLoading: isUpdating}] = editSubcatOrder();
    const dispatch = useAppDispatch();
    const {selectedItem} = useSelector((state:StateSchema)=>state.subcatCards);
    const navigate = useNavigate();
    const onSubcatClick = (el: SubcategoryAnswer) => {
        return ROUTE_MAPPER[el.subcategory_type] + el.id;
    };
    const calculateMods = useCallback((index:number)=>({
        [cls.greymarker]:data?.data[index].status==="no_answer",
        [cls.greenmarker]:data?.data[index].status==="success",
    }),[data]);

    const dragStartHandler = (e:React.DragEvent<HTMLDivElement>,el:SubcategoryAnswer) => {
        // console.log("старт на ",el.name,el.user_object);
        dispatch(subcatCardSliceActions.setItem(el));
    };

    const dragLeaveHandler = (e:React.DragEvent<HTMLDivElement>) => {
        
    };
    const dragEndHandler = (e:React.DragEvent<HTMLDivElement>) => {
        
    };
    const dragOverHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const dropHandler = (e:React.DragEvent<HTMLDivElement>,el:SubcategoryAnswer) => {
        e.preventDefault();
        const success = selectedItem && (el.user_object===selectedItem.user_object);
        if (success) {
            editOrder({id:selectedItem.id,order_index:el.order_index});
            editOrder({id:el.id,order_index:selectedItem.order_index});
        }
        dispatch(subcatCardSliceActions.removeItem());
    };

    return (
        <VFlexBox className={classNames(cls.ObjectCategoryView, {}, [className])}>
            <VFlexBox height="30%" className={cls.cardHeader}>
                <b style={{"height":"18%"}} className={cls.objType}>ТИП ДАННОГО ОБЪЕКТА</b>
                <b  style={{"height":"15%"}}>{adress}</b>
                {
                    data &&
                    <p className={cls.sysCountPref}>{`Количество систем: ${data.count}`}</p>
                }
            </VFlexBox>
            <VFlexBox height="69%" className={cls.systemsBox}>
                {data && data.data.map((
                    (el,i) =>
                        <HFlexBox  
                            align="space-around"
                            alignItems="center"
                            onClick={() =>navigate(onSubcatClick(el))}
                            key={el.id}
                            className={classNames(cls.systemLine, calculateMods(i), [])}
                            draggable={true}
                            onDragStart={(e)=>dragStartHandler(e,el)}
                            onDragLeave={dragLeaveHandler}
                            onDragEnd={dragEndHandler}
                            onDragOver={dragOverHandler}
                            onDrop={(e)=>dropHandler(e,el)}
                        >
                            <p style={{"width":"75%"}}>{el.name}</p>
                            {el.subcategory_type === "heat_energy_node" && <HeatIcon className={cls.icon} />}
                            {el.subcategory_type === "pump_station_node" && <PumpIcon className={cls.icon} />}
                            {el.subcategory_type !== "heat_energy_node" && el.subcategory_type !== "pump_station_node" && el.subcategory_type !== "auto_node" && <ElectroIcon className={cls.icon} />}
                            {el.subcategory_type === "auto_node" && <AutoIcon className={cls.icon} />}
                        </HFlexBox>
                ))}
                <div className={classNames(cls.systemLine, {}, [])}>
                    <p>{"+ добавить систему"}</p>
                </div>
            </VFlexBox>


        </VFlexBox>
    );
}