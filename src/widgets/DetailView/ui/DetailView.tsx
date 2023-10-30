import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import { ReactNode, useCallback } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

interface DetailViewProps {
 className?: string;
 children?:ReactNode;
 tabSelected?:boolean;
 generalSelected?:boolean;
 setTabSelected?:(val:boolean)=>void;
 setGeneralSelected?:(val:boolean)=>void;
}
const GENERALTABSELECTEDKEY = "main_tab_selected";
export function DetailView(props: DetailViewProps) {
    const { className,children,setTabSelected,tabSelected,generalSelected,setGeneralSelected } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (generalSelected && tabSelected) {
        setTabSelected(false);
    }

    const tabHandler = useCallback((val:boolean)=> {
        setTabSelected(val);
        setGeneralSelected(false);
    },[setGeneralSelected, setTabSelected]);


    const saveSelecting = useCallback((index:number)=>{
        localStorage.setItem(GENERALTABSELECTEDKEY,String(index));
        if (index===0){
            navigate(RoutePathAuth.general);
        }
    },[navigate]);
    const getSelecting = useCallback(()=>{
        const index = localStorage.getItem(GENERALTABSELECTEDKEY) || 0;
        return Number(index);
        
    },[]);

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            {children}
        </div>
    );
}