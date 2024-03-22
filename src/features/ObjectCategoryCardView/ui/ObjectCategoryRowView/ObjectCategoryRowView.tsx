import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryRowView.module.scss";

import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import HeatIcon from "shared/assets/icons/SystemHeatNodeIcon.svg";
import ElectroIcon from "shared/assets/icons/SystemElectroNodeIcon.svg";
import PumpIcon from "shared/assets/icons/SystemPumpNodeIcon.svg";
import AutoIcon from "shared/assets/icons/SystemAutomaticNodeIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { cp } from "fs";
import PlusIcon from "shared/assets/icons/plusSystemIcon.svg";
import { SubcategoryAnswer, editSubcatOrder, getObjectSubcategoryData } from "features/ObjectCategoryCardView/api/objectSubcategorysApi";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { count } from "console";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { subcatCardSliceActions } from "features/ObjectCategoryCardView/model/cardSlice";
interface ObjectCategoryRowViewProps {
 className?: string;
 openedID:number;
 setOpened:(id:number)=>void;
 adress:string;
 last_update:string;
 id:number;
}
const IconMapper:any = {
    "heat_energy_node":HeatIcon,
    2:ElectroIcon,
    "auto_node":AutoIcon,
    "pump_station_node":PumpIcon
};
export function ObjectCategoryRowView(props: PropsWithChildren<ObjectCategoryRowViewProps>) {
    const { className,id,adress,openedID,setOpened,last_update} = props;
    const {data,isLoading,refetch} = getObjectSubcategoryData(id);

    useEffect(()=>{
        refetch();
    },[]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {selectedItem} = useSelector((state:StateSchema)=>state.subcatCards);
    const [editOrder,{isLoading: isUpdating}] = editSubcatOrder();
    const markerIcon = Math.floor (Math.random () * (4 - 1 + 1)) + 1;
    const markerColor = Math.floor (Math.random () * (4 - 1 + 1)) + 1;
    const Icon  = IconMapper[markerIcon] as React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const onSubcatClick = (el:SubcategoryAnswer)=>{
        if (el.subcategory_type==="heat_energy_node") {
            navigate(RoutePathAuth.heat_subcat+el.id) ;
        }
        else if (el.subcategory_type==="auto_node") {
            navigate(RoutePathAuth.auto_subcat+el.id) ;
        }
        else if (el.subcategory_type === "pump_station_node") {
            navigate(RoutePathAuth.pump_subcat+el.id) ;

        }
        else if (el.subcategory_type === "electro_energy_node") {
            navigate(RoutePathAuth.el_subcat+el.id) ;

        }
        else navigate (RoutePathAuth.subcat + el.id);
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
        <VFlexBox height={openedID===id ? `${data.count*6+12}%` : "6%"} gap="10px"  className={classNames(cls.catRow,{},[className,])}>
            <HFlexBox  align="space-around" alignItems="center" height={openedID===id ? `${100/(data.count+2)}%` : "100%"}  onClick={()=>setOpened(id)}  className={cls.rowHeader}>
                <u className={cls.headerField}>ТИП ОБЪЕКТА</u>
                <p className={cls.adressField}>{adress}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.timestampField}/>
            </HFlexBox>
            {
                id===openedID &&
                <VFlexBox height={`${ 100/(data.count+2) * (data.count+1)}%`}  gap="10px" alignItems="center" className={classNames(cls.rows,{},[])}>
                    {    
                        data && data.data.map((el,i)=>
                            <HFlexBox
                                onClick={()=>onSubcatClick(el)}
                                height={`${100/(data.count+1)}%`}
                                key={el.id}
                                align="space-around"
                                alignItems="center"
                                className={classNames("",calculateMods(i),[cls.row])}
                                draggable={true}
                                onDragStart={(e)=>dragStartHandler(e,el)}
                                onDragLeave={dragLeaveHandler}
                                onDragEnd={dragEndHandler}
                                onDragOver={dragOverHandler}
                                onDrop={(e)=>dropHandler(e,el)}
                            >
                                <HFlexBox align="space-between" alignItems="center" width="20%">
                                    {el.subcategory_type==="heat_energy_node" && <HeatIcon className={cls.icon}/>}
                                    {!el.subcategory_type && <ElectroIcon className={cls.icon}/>}
                                    {el.subcategory_type==="auto_node" && <AutoIcon className={cls.icon}/>}
                                    {el.subcategory_type==="pump_station_node" && <PumpIcon className={cls.icon}/>}
                                    <p className={cls.nameField}>{el.name}</p>
                                </HFlexBox>
                                
                                <p className={cls.eventField}>мок событие</p>
                                <p className={cls.datetimeField}>{el.last_update}</p>
                            </HFlexBox>
                        )
                    }
                    <HFlexBox  gap='10px' alignItems="center" height={`${100/(data.count+1)}%`}  className={classNames(cls.addingRow,{},[cls.row])}>
                        <PlusIcon className={cls.addIcon}/>
                        <p>Добавить систему</p>
                    </HFlexBox>
                    <p>{last_update}</p>

                </VFlexBox>}
            
        </VFlexBox>
    );
}