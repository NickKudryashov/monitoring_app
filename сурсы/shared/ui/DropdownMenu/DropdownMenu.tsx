import classNames from "shared/lib/classNames/classNames";
import cls from "./DropdownMenu.module.scss";
import DropdownIcon from "shared/assets/icons/dropdownIcon.svg";
import { LegacyRef, PropsWithChildren, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import React from "react";

interface DropdownMenuItem {
    text:string;
    onClick:()=>void;
}

interface DropdownMenuProps {
 className?: string;
 header?:string;
 Icon?:React.FunctionComponent<React.SVGAttributes<SVGElement>>;
 rotateIcon?:boolean;
 lazy?:boolean;
 items:DropdownMenuItem[];
}

export function DropdownMenu(props: PropsWithChildren<DropdownMenuProps>) {
    const { className,items,header,Icon,rotateIcon=false,lazy=true } = props;
    const [opened,setOpened] = useState(false);
    const mods = {
        [cls.collapsed]:opened
    };

    const onClickHandler = (onClick:()=>void)=>{
        setOpened(prev=>!prev);
        onClick();
    };

    const menu = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event:MouseEvent) => {
        const node = event.target;
        if (
            menu.current && opened &&
          !(menu.current.contains(node as Node)))
        {
            setOpened(prev=>!prev);
        }
    },[opened]);

    useEffect(()=>{
        document.addEventListener("click",handleClickOutside);
        return ()=> {
            document.removeEventListener("click", handleClickOutside);
        };
    },[handleClickOutside]);



    return (
        <div ref={menu}>
            <li 
                className={classNames(cls.DropdownMenu,mods,[className])}
            >
                <div className={cls.headerIcon}>
                    <ul className={cls.header} 
                        onClick={()=>setOpened(prev=>!prev)}
                    >
                        {header}
                    </ul>
                    <Icon 
                        className={classNames(cls.icon,{[cls.rotatedIcon]:rotateIcon},[])}
                        onClick={()=>setOpened(prev=>!prev)} />
                </div>
                <div className={classNames("",mods,[cls.content,])}>
                    {opened && items.map((item)=>
                        <ul 
                            className={cls.item} 
                            key={item.text} 
                            onClick={()=>onClickHandler(item.onClick)} >
                            {item.text}
                        </ul>)}
                </div>        
            </li>
        </div>

    );
}