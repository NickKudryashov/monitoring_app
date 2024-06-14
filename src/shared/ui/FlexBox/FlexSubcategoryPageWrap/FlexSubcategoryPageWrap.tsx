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
        <VFlexBox width="90%" height="170%">
            <VFlexBox height="21%" />
            <VFlexBox height="58%">{children}</VFlexBox>
            <VFlexBox height="21%" />
        </VFlexBox>
    );
};
