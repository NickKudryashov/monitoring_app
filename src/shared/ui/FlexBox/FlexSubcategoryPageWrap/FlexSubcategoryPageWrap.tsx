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
        // <VFlexBox width="90%" align="space-between" height="170%">
        <VFlexBox width="90%" align="space-between" height="100%">
            {/* <VFlexBox height="20%" /> */}
            {/* <VFlexBox height="58%">{children}</VFlexBox> */}
            <VFlexBox height="100%">{children}</VFlexBox>
            {/* <VFlexBox height="20%" /> */}
        </VFlexBox>
    );
};
