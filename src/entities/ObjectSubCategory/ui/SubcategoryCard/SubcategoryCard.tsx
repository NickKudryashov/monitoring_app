import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./SubcategoryCard.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface SubcategoryCardProps {
 className?: string;
 catID:number;
 onClick?:()=>void;
}

export const SubcategoryCard = memo((props: PropsWithChildren<SubcategoryCardProps>) => {
    const { className,catID,onClick } = props;
    const {entities} = useSelector((state:StateSchema)=>state.objSubCat);

    return (
        <div className={classNames(cls.SubcategoryCard,{},[className])}>
            {entities[catID] && 
            <p className={cls.cardContent} onClick={onClick}>
                {entities[catID].name}
            </p>}
        </div>
    );
});
