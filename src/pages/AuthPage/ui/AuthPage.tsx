import classNames from "@/shared/lib/classNames/classNames";
import cls from "./AuthPage.module.scss";

import type { PropsWithChildren } from "react";
import { AuthWidget } from "@/widgets/AuthWidget/AuthWidget";
import { Navbar } from "@/widgets/Navbar";
import AuthLogoIcon from "@/shared/assets/icons/AuthLogoIcon.svg";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
interface AuthPageProps {
    className?: string;
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className = "" } = props;
    const isMobile = useMobilDeviceDetect();
    return (
        <VFlexBox
            data-testid="AuthPage"
            className={classNames(cls.AuthPage, {}, [className])}
            alignItems="center"
            gap="5px"
        >
            {!isMobile && <Navbar className={cls.navbar} isAuth={false} />}
            <VFlexBox height="fit-content" align="center" alignItems="center">
                <AuthLogoIcon className={cls.logoIcon} />
                {isMobile && <p className={cls.title}>АлВик-сервис</p>}
            </VFlexBox>
            <div className={cls.form}>
                <AuthWidget />
            </div>
        </VFlexBox>
    );
}
