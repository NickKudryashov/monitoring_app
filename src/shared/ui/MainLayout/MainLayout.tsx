import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./MainLayout.module.scss";

import type { PropsWithChildren } from "react";
import { HFlexBox } from "../FlexBox/HFlexBox/HFlexBox";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getVersion } from "@/entities/user";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
interface MainLayoutProps {
    className?: string;
    navbar: React.ReactNode;
    DetailView: React.ReactNode;
    sidebar: React.ReactElement;
}

export const MainLayout = memo((props: PropsWithChildren<MainLayoutProps>) => {
    const { className = "", DetailView, navbar, sidebar, children } = props;
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
            <p className={cls.version}>{version}</p>
        </div>
    );
});
