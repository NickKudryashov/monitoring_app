import classNames from "@/shared/lib/classNames/classNames";
import { memo, useLayoutEffect } from "react";
import cls from "./MockPage.module.scss";
import type { PropsWithChildren } from "react";
import { Navbar } from "@/widgets/Navbar";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { useNavigate } from "react-router-dom";
import { RoutePathPublic } from "@/shared/config/RouteConfig/RouteConfig";
interface MockPageProps {
    className?: string;
}

const MockPage = memo((props: PropsWithChildren<MockPageProps>) => {
    const { className = "" } = props;

    return (
        <div
            data-testid="MockPage"
            className={classNames(cls.MockPage, {}, [className])}
        >
            <VFlexBox>
                <Navbar className={cls.navbar} isAuth={false} />
                <h1 className={cls.header}>
                    ДИСПЕТЧЕРИЗАЦИЯ ИНЖЕНЕРНЫХ СИСТЕМ
                </h1>
            </VFlexBox>

            {/* <img className={cls.image} src={logoImage}/> */}
        </div>
    );
});
MockPage.displayName = "mockPage";
export { MockPage };
