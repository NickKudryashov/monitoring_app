import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo } from "react";
import cls from "./MainLayout.module.scss";

import type { PropsWithChildren } from "react";
import { Footer } from "../Footer/Footer";

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
                    {/* <div className={cls.listWithGeneral}> */}
                    {sidebar}
                    {/* {deviceList} */}
                    {/* </div> */}
                    <div className={cls.dtlWrapper}>
                        {
                            DetailView
                        }
                    </div>
                    
                    
                    {/* {children} */}
                    {/* <DetailView/> */}
                </div>
            </div>
            {/* {footer} */}

        </div>
    );
});
