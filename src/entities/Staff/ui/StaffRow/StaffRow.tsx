import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./StaffRow.module.scss";

import type { PropsWithChildren } from "react";
import { StaffAction } from "../StaffActions/StaffAction";

interface StaffRowProps {
    className?: string;
}

export const StaffRow = memo((props: PropsWithChildren<StaffRowProps>) => {
    const { className = "" } = props;

    return (
        <div className={classNames(cls.StaffRow, {}, [className])}>
            <div className={cls.dataColumn}>
                <p>Организация</p>
                <p>ООО Алвик-Сервис</p>
                <p>ИНН .......</p>
                <p>КПП .......</p>
            </div>
            <div className={cls.dataColumn}>
                <p>ФИО</p>
                <p>Головесов Алексей Игоревич</p>
            </div>
            <div className={cls.dataColumn}>
                <p>Должность</p>
                <p>Инженер</p>
            </div>
            <div className={cls.dataColumn}>
                <p>Контакты</p>
                <p>Тел. +7989285982</p>
                <p>email: avs-dm@mail.ru</p>
            </div>
            <div className={cls.dataColumn}>
                <p>Роль</p>
                <p>Администратор</p>
            </div>
            <StaffAction />
        </div>
    );
});
