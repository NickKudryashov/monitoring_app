import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./MockPage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { DetailView } from "widgets/DetailView";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { Footer } from "shared/ui/Footer/Footer";

interface MockPageProps {
 className?: string;
}

export const MockPage = memo((props: PropsWithChildren<MockPageProps>) => {
    const { className } = props;
    const content = (
        <DetailView className={cls.detail}>
            <MockComponent/>
        </DetailView>
    );
    return (
        <MainLayout
            className={classNames(cls.MockPage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
            footer={<Footer/>}
        />
    );
});
