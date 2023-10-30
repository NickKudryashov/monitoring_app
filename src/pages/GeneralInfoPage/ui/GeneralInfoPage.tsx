import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./GeneralInfoPage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { DetailView } from "widgets/DetailView";
import { GeneralInformation } from "features/GeneralInformation";
import { Footer } from "shared/ui/Footer/Footer";

interface GeneralInfoPageProps {
 className?: string;
}

const GeneralInfoPage = memo((props: PropsWithChildren<GeneralInfoPageProps>) => {
    const { className } = props;
    const content = (
        <DetailView className={cls.detail}>
            <GeneralInformation/>
        </DetailView>
    );
    return (
        // <MainLayout
        //     className={classNames(cls.GeneralInfoPage,{},[className])}
        //     navbar={<Navbar/>}
        //     deviceList={<DeviceList/>}
        //     DetailView={content}
        //     footer={<Footer/>}
        // />
        <div className={classNames(cls.GeneralInfoPage, {}, [className])}>
            {/* <MainLayout
                DetailView={content}
                deviceList={<DeviceList />}
                navbar={<Navbar/>}
                footer={<Footer/>}
            /> */}
            {content}
        </div>
    );
});

export default GeneralInfoPage;
