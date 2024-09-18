import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import AutoSubcategoryMobilePage from "../AutoSubcategoryMobilePage/AutoSubcategoryMobilePage";
import AutoSubcategoryPage from "../AutoSubcategoryPage/AutoSubcategoryPage";
import { lazy } from "react";

const MobileAdapter = () => {
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return <AutoSubcategoryMobilePage />;
    } else {
        return <AutoSubcategoryPage />;
    }
};

export default MobileAdapter;
export const Adapter = lazy(() => import("./MobileAdapter.async"));
