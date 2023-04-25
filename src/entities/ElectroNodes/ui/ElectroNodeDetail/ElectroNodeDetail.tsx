import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ElectroNodeDetail.module.scss";

import type { PropsWithChildren } from "react";

interface ElectroNodeDetailProps {
 className?: string;
}

export const ElectroNodeDetail = memo((props: PropsWithChildren<ElectroNodeDetailProps>) => {
    const { className,children } = props;

    return (
        <div className={classNames(cls.ElectroNodeDetail,{},[className])}>
            Узел учета электроэнергии
            {children}
        </div>
    );
});
