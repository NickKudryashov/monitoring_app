import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./MainLayoutPageLoader.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DetailView } from "widgets/DetailView";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { Loader } from "shared/ui/Loader/Loader";
import { Footer } from "shared/ui/Footer/Footer";
import { Sidebar } from "widgets/Sidebar";

interface MainLayoutPageLoaderProps {
 className?: string;
}

export const MainLayoutPageLoader = memo((props: PropsWithChildren<MainLayoutPageLoaderProps>) => {
    const { className } = props;
    const content = (
        <DetailView className={cls.detail}>
            <Loader/>
        </DetailView>
    );
    return (
        <MainLayout
            className={cls.MainLayoutPageLoader}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            sidebar={<Sidebar/>}
            DetailView={content}
            footer={<Footer/>}
        />
    );
});
