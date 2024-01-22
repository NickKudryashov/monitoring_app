import classNames from "shared/lib/classNames/classNames";
import cls from "./DropdownMenu.module.scss";
import DropdownIcon from "shared/assets/icons/dropdownIcon.svg";
import { LegacyRef, PropsWithChildren, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { HFlexBox } from "../FlexBox/HFlexBox/HFlexBox";

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
 height?:string;
 width?:string;
}

export function DropdownMenu(props: PropsWithChildren<DropdownMenuProps>) {
    const { className,header,Icon=DropdownIcon,rotateIcon=false,lazy=true,height="100%",width="100%" } = props;
    const [opened,setOpened] = useState(false);
    const mods = {
        [cls.collapsed]:opened
    };
    return (
        <HFlexBox
            align="flex-end"
            alignItems="center" 
            className={classNames(cls.DropdownMenu,mods,[className])}
            height={height}
            width={width}
        >
            {header}
            <Icon 
                className={classNames(cls.icon,{[cls.rotatedIcon]:rotateIcon},[])}
                onClick={()=>setOpened(prev=>!prev)} />    
        </HFlexBox>

    );
}