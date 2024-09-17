import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./DetailInformation.module.scss";

import type { PropsWithChildren } from "react";

interface DetailInformationProps {
    className?: string;
}

export const DetailInformation = memo(
    (props: PropsWithChildren<DetailInformationProps>) => {
        const { className = "" } = props;

        return (
            <div className={classNames(cls.DetailInformation, {}, [className])}>
                <div className={cls.orgData}>
                    <p className={cls.title}>ООО Решаем вместе</p>
                    <div className={cls.rowData}>
                        <>
                            <p>{"ИНН"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"КПП"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"ОГРН"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Форма управления"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Юридический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111111"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"11111112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"133311112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"133311112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"133311112221"}</p>
                        </>
                    </div>
                    <div className={cls.rowData}>
                        <>
                            <p>{"Фактический адрес"}</p>
                            <p>{"133311112221"}</p>
                        </>
                    </div>
                </div>
                <div className={cls.addInfo}>
                    <p className={cls.addBlock}>
                        Дополнительная информация 1....
                    </p>
                    <p className={cls.addBlock}>
                        Дополнительная информация 2....
                    </p>
                </div>
            </div>
        );
    }
);
