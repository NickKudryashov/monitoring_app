import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./Card.module.scss";

import type { PropsWithChildren } from "react";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";

interface CardProps {
    className?: string;
}

export const Card = memo((props: PropsWithChildren<CardProps>) => {
    const { className = "" } = props;

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            {"УК ООО РЕШАЕМ ВМЕСТЕ "}
            <br />
            {"ИНН КПП ОГРН ..."}
            <AppButon theme={AppButtonTheme.SHADOW}>Редактировать</AppButon>
        </div>
    );
});
