import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo } from "react";
import cls from "./MainLayout.module.scss";

import type { PropsWithChildren } from "react";
import { Footer } from "../Footer/Footer";
import ChatIcon from "shared/assets/icons/ChatIcon.svg";
import { HFlexBox } from "../FlexBox/HFlexBox/HFlexBox";
interface MainLayoutProps {
 className?: string;
 navbar:React.ReactNode;
 deviceList:React.ReactNode;
 DetailView:React.ReactNode;
 footer:React.ReactElement;
 sidebar:React.ReactElement
}

export const MainLayout = memo((props: PropsWithChildren<MainLayoutProps>) => {
    const { className,DetailView,deviceList,navbar,footer,sidebar,children } = props;

    return (
        <div className={classNames(cls.MainLayout,{},[className])}>
            {navbar}
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    {sidebar}
                    <div className={cls.dtlWrapper}>
                        <HFlexBox gap="25px" align="flex-end">
                            {
                                DetailView
                            }
                        </HFlexBox>
                    </div>
                </div>
            </div>
            <p className={cls.version}>v5.5 23.05.24</p>
        </div>
    );
});
