import { ReactElement, ReactNode } from "react";
import cls from "./FeatureBlock.module.scss";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
export const FeatureBlock = (props:{title:string,children?:ReactNode}):ReactElement=>{
    const {title,children} = props;
    return (
        <VFlexBox alignItems="center" gap="15px" className={cls.featureBox} width="20%" height="49%">
            <p className={cls.featureBoxHeader}>{title}</p>
            <VFlexBox width="90%"  gap="5px" alignItems="center"  height="80%">
                {children}
            </VFlexBox>
        </VFlexBox>
    );
};