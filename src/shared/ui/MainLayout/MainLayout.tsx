import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./MainLayout.module.scss";
import CookieConsent from "react-cookie-consent";
import type { PropsWithChildren } from "react";
import { HFlexBox } from "../FlexBox/HFlexBox/HFlexBox";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getVersion } from "@/entities/user";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { AppButon } from "../AppButton/AppButton";
interface MainLayoutProps {
    className?: string;
    navbar: React.ReactNode;
    DetailView: React.ReactNode;
    sidebar: React.ReactElement;
}

export const MainLayout = memo((props: PropsWithChildren<MainLayoutProps>) => {
    const { className = "", DetailView, navbar, sidebar, children } = props;
    const isMobile = useMobilDeviceDetect();
    const version = useSelector(getVersion);
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            {navbar}
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    {sidebar}
                    <div className={cls.dtlWrapper}>
                        <HFlexBox gap="25px" align="center">
                            {DetailView}
                        </HFlexBox>
                    </div>
                </div>
            </div>
            <CookieConsent
                buttonText={"Подтверждаю"}
                buttonStyle={{ borderRadius: 5, background: "white" }}
                style={{ background: "#355EAB", opacity: 0.8 }}
            >
                Пользуясь данным веб-ресурсом вы даете согласие на использование
                ваших персональных данных и файлов cookies
            </CookieConsent>
            {!isMobile && <p className={cls.version}>{version}</p>}
        </div>
    );
});
MainLayout.displayName = "MainLayout";
