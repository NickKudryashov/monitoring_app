import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { memo } from "react";
import { Navbar, NavbarProps } from "../Navbar/Navbar";
import { MobileNavbar } from "../NavbarMobile/NavbarMobile";

export const NavbarByDevice = memo((props: NavbarProps) => {
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return <MobileNavbar {...props} />;
    } else {
        return <Navbar {...props} />;
    }
});
NavbarByDevice.displayName = "NavbarDeviceSelectWrapper";
