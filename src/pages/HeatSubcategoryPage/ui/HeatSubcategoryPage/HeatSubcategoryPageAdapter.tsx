import { lazy } from "react";
import {
    HeatSubcategoryPage,
    HeatSubcategoryPageProps,
} from "./HeatSubcategoryPage";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { HeatSubcategoryMobilePage } from "../HeatSubcategoryMobilePage/HeatSubcategoryMobilePage";

const HeatSubcategoryAdapter = (props: HeatSubcategoryPageProps) => {
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return <HeatSubcategoryMobilePage {...props} />;
    } else {
        return <HeatSubcategoryPage {...props} />;
    }
};
export default HeatSubcategoryAdapter;
