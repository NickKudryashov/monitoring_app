import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./AdministrationPage.module.scss";

import type { PropsWithChildren } from "react";
import { DetailView } from "widgets/DetailView";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

interface AdministrationPageProps {
    className?: string;
}

const AdministrationPage = memo(
    (props: PropsWithChildren<AdministrationPageProps>) => {
        const { className = "" } = props;
        let content;
        const navigate = useNavigate();
        content = (
            <DetailView>
                <HFlexBox align={"space-around"} className={cls.detail}>
                    <div className={cls.buttonBox}>
                        <VFlexBox gap="15px">
                            <p className={cls.buttonBoxTitle}>
                                НАСТРОЙКИ КОМПАНИИ
                            </p>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Информация о компании
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Добавить адрес объекта
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Добавить системы в объекты
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Модули настройка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Настройка архива
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Настройки доступов жителям
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Настройки CRM системы
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Настройка архива
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Настройка доступа подрядной организации
                            </AppButon>
                            <AppButon
                                onClick={() =>
                                    navigate(RoutePathAuth.heat_subcat + "1")
                                }
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                посмотреть УУТЭ
                            </AppButon>
                        </VFlexBox>
                    </div>
                    <div className={cls.buttonBox}>
                        <VFlexBox gap="15px">
                            <p className={cls.buttonBoxTitle}>ЛИЧНЫЙ КАБИНЕТ</p>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Персональная информация
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Добавить сотрудников
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Типы заявок
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Типы заявок
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                            <AppButon
                                className={cls.btn}
                                theme={AppButtonTheme.DESIGNED_PRIMARY}
                            >
                                Заглушка
                            </AppButon>
                        </VFlexBox>
                    </div>
                </HFlexBox>
            </DetailView>
        );

        return (
            <div
                className={classNames(cls.AdministrationPage, {}, [className])}
            >
                {content}
            </div>
        );
    }
);

export default AdministrationPage;
