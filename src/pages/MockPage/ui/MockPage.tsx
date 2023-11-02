import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./MockPage.module.scss";
import type { PropsWithChildren } from "react";
import { Navbar } from "widgets/Navbar";
import logoImage from "shared/assets/images/mainImage.png";
interface MockPageProps {
 className?: string;
}

export const MockPage = memo((props: PropsWithChildren<MockPageProps>) => {
    const { className } = props;
    return (
        <div
            className={classNames(cls.MockPage,{},[className])}
        >
            <Navbar className={cls.navbar} isAuth={false}/>
            <h1 className={cls.header}>ДИСПЕТЧЕРИЗАЦИЯ ИНЖЕНЕРНЫХ СИСТЕМ</h1>
            <img className={cls.image} src={logoImage}/>
        </div>
    );
});
