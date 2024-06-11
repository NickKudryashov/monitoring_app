import { ReactElement, ReactNode } from "react";
import { VFlexBox } from "../VFlexBox/VFlexBox";

interface FlexSubcategoryPageWrapProps {
    children?: ReactNode;
}

export const FlexSubcategoryPageWrap = (
    props: FlexSubcategoryPageWrapProps
): ReactElement => {
    const { children } = props;
    return (
        <VFlexBox width="90%" height="135%">
            <VFlexBox height="74%">{children}</VFlexBox>
            <VFlexBox height="26%" />
        </VFlexBox>
    );
};
