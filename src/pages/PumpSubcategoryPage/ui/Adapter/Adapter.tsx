import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { lazy } from "react";
import PumpSubcategoryMobilePage from "../PumpSubcategoryMobilePage/PumpSubcategoryMobilePage";
import PumpSubcategoryPage from "../PumpSubcategoryPage/PumpSubcategoryPage";

const MobileAdapter = () => {
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return <PumpSubcategoryMobilePage />;
    } else {
        return <PumpSubcategoryPage />;
    }
};

export default MobileAdapter;
export const Adapter = lazy(() => import("./Adapter"));
