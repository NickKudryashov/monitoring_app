import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./StaffActions.module.scss";

import type { PropsWithChildren } from "react";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface StaffActionProps {
 className?: string;
}

export const StaffAction = memo((props: PropsWithChildren<StaffActionProps>) => {
    const { className } = props;

    return (
        <div className={classNames(cls.StaffActions,{},[className])}>
            <AppButon theme={AppButtonTheme.SHADOW}>Редактировать</AppButon>
            <AppButon theme={AppButtonTheme.SHADOW}>Отключить</AppButon>
            <AppButon theme={AppButtonTheme.SHADOW}>Удалить</AppButon>
        </div>
    );
});
