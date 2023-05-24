import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo } from "react";
import cls from "./MainLayout.module.scss";

import type { PropsWithChildren } from "react";

interface MainLayoutProps {
 className?: string;
 navbar:React.ReactNode;
 deviceList:React.ReactNode;
 DetailView:React.ReactNode;
}

export const MainLayout = memo((props: PropsWithChildren<MainLayoutProps>) => {
    const { className,DetailView,deviceList,navbar,children } = props;

    return (
        <div className={classNames(cls.MainLayout,{},[className])}>
            {navbar}
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    <div className={cls.listWithGeneral}>
                        {/* <AppButon className={cls.generalInfoBtn} onClick={()=>{dispatch(categorySlice.actions.closeAllCat());setGeneralSelected(true);}}>Общая информация</AppButon> */}
                        {deviceList}
                    </div>
                    {
                        DetailView
                    }
                    {/* {children} */}
                    {/* <DetailView/> */}
                </div>
            </div>
        </div>
    );
});
