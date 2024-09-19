import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { lazy } from "react";
import ElectroSubcategoryMobilePage from "../ElectroSubcategoryMobilePage/ElectroSubcategoryMobilePage";
import ElectroSubcategoryPage from "../ElectroSubcategoryPage/ElectroSubcategoryPage";

const MobileAdapter = () => {
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return <ElectroSubcategoryMobilePage />;
    } else {
        return <ElectroSubcategoryPage />;
    }
};
export default MobileAdapter;
export const Adapter = lazy(() => import("./MobileAdapter"));
