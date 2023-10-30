import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryView.module.scss";

import { PropsWithChildren } from "react";
import { getObjectSubcategoryData } from "../api/objectSubcategorysApi";
import HeatIcon from 'shared/assets/icons/SystemHeatNodeIcon.svg'
import ElectroIcon from 'shared/assets/icons/SystemElectroNodeIcon.svg'
import PumpIcon from 'shared/assets/icons/SystemPumpNodeIcon.svg'
import AutoIcon from 'shared/assets/icons/SystemAutomaticNodeIcon.svg'
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
interface ObjectCategoryViewProps {
 className?: string;
 adress:string;
 id:number;
}
const IconMapper:any = {
    1:HeatIcon,
    2:ElectroIcon,
    3:AutoIcon,
    4:PumpIcon
}
export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className,id,adress} = props;
    const {data,isLoading} = getObjectSubcategoryData(id)
    const navigate = useNavigate()
    const markerIcon = Math.floor (Math.random () * (4 - 1 + 1)) + 1
    const markerColor = Math.floor (Math.random () * (4 - 1 + 1)) + 1
    const Icon  = IconMapper[markerIcon] as React.FunctionComponent<React.SVGAttributes<SVGElement>>
    const mods = {
            [cls.redmarker]:markerColor===1,
            [cls.greymarker]:markerColor===2,
            [cls.orangemarker]:markerColor===3,
            [cls.greenmarker]:markerColor===4,
        }
    return (
        <div  className={classNames(cls.ObjectCategoryView,{},[className])}>
            <div className={cls.cardHeader}>
                <p>{adress}</p>
                {
                    data && 
                        <p className={cls.sysCountPref}>{`Количество систем: ${data.count}`}</p>
                }
            </div>
            <div className={cls.systemsBox}>
            {data && data.data.map((
                el=>
                <div onClick={()=>navigate(RoutePathAuth.subcat + el.id)} key={el.id} className={classNames(cls.systemLine,mods,[])}>
                    <p>{el.name}</p>
                    <Icon className={cls.icon}/>
                </div>
            ))}
            </div>
            
            
        </div>
    );
}