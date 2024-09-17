import { memo } from "react";
import cls from "./MainLayoutPageLoader.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";
import { DetailView } from "@/widgets/DetailView";
import { Navbar } from "@/widgets/Navbar";
import { Loader } from "@/shared/ui/Loader/Loader";
import { Sidebar } from "@/widgets/Sidebar";

interface MainLayoutPageLoaderProps {
    className?: string;
}

export const MainLayoutPageLoader = memo(
    (props: PropsWithChildren<MainLayoutPageLoaderProps>) => {
        const { className } = props;
        const content = (
            <DetailView className={cls.detail}>
                <Loader />
            </DetailView>
        );
        return (
            <MainLayout
                className={cls.MainLayoutPageLoader}
                navbar={<Navbar />}
                sidebar={<Sidebar />}
                DetailView={content}
            />
        );
    }
);
