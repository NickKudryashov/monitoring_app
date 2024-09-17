import { PropsWithChildren, useState } from "react";
import { DetailView } from "@/widgets/DetailView";
import cls from "./SettingsPage.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { AddCategory } from "@/features/AddCategory";
import { AddHeatDevice } from "@/features/AddHeatDevice";
import { AddElectroDevice } from "@/features/AddElectroDevice";
import { AddPumpDevice } from "@/features/AddPumpStationDevice";
import { AddAutoDevice } from "@/features/AddAutoDevice";
import { AddObject } from "@/features/AddObject";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";
import { FeatureBlock } from "../FeatureBlock/FeatureBlock";
interface SettingsPageProps {
    className?: string;
}
const MOCK = [
    "ОБЪЕКТЫ",
    "СИСТЕМЫ",
    "ЗАДАЧИ",
    "АРХИВ",
    "АНАЛИТИКА",
    "ЗАЯВКИ",
    "ПЛАНОВЫЕ РАБОТЫ",
    "ВИДЕОКАМЕРЫ",
];
const MOCK1 = [1, 2, 3, 4, 5, 6, 7];
const SettingsPage = (props: PropsWithChildren<SettingsPageProps>) => {
    const { className } = props;
    const [addSubcatModal, setAddSubcatModal] = useState(false);
    const [addHeatModal, setAddHeatModal] = useState(false);
    const [addPumpModal, setPumpModal] = useState(false);
    const [addElectroModal, setElectroModal] = useState(false);
    const [addAutoModal, setAutoModal] = useState(false);
    const [addObjectModal, setAddObjectModal] = useState(false);
    const navigate = useNavigate();
    const content = (
        <DetailView>
            <HFlexBox
                gap="20px"
                height="90%"
                align="center"
                className={cls.plate}
            >
                <FeatureBlock title="ОБЪЕКТЫ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить информацию о компании</p>
                    </HFlexBox>
                    <HFlexBox
                        onClick={() => setAddObjectModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить объект</p>
                        <AddObject
                            isOpen={addObjectModal}
                            onClose={() => setAddObjectModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить подрядную организацию</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Сотрудники</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки событий</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить участки</p>
                    </HFlexBox>
                </FeatureBlock>

                <FeatureBlock title="СИСТЕМЫ">
                    <HFlexBox
                        onClick={() => setAddSubcatModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить систему</p>
                        <AddCategory
                            isOpen={addSubcatModal}
                            onClose={() => setAddSubcatModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        onClick={() => setAddHeatModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить теплосчетчик</p>
                        <AddHeatDevice
                            isOpen={addHeatModal}
                            onClose={() => setAddHeatModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        onClick={() => setElectroModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить электро</p>
                        <AddElectroDevice
                            isOpen={addElectroModal}
                            onClose={() => setElectroModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        onClick={() => setPumpModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить насосную</p>
                        <AddPumpDevice
                            isOpen={addPumpModal}
                            onClose={() => setPumpModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        onClick={() => setAutoModal(true)}
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить автоматику</p>
                        <AddAutoDevice
                            isOpen={addAutoModal}
                            onClose={() => setAutoModal(false)}
                        />
                    </HFlexBox>
                    <HFlexBox
                        onClick={() =>
                            navigate(RoutePathAuth.object_subcat_edit)
                        }
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Редактировать системы</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="ЗАДАЧИ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки по объекту</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="АРХИВ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки архива</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Редактировать архив</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="АНАЛИТИКА">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки по объекту</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="ЗАЯВКИ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Общие настройки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить сотрудника</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить участки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки доступа подрядной организации</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Типы заявок</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Добавить лицевой счет</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="ПЛАНОВЫЕ РАБОТЫ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки по объекту</p>
                    </HFlexBox>
                </FeatureBlock>
                <FeatureBlock title="ВИДЕОКАМЕРЫ">
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки</p>
                    </HFlexBox>
                    <HFlexBox
                        className={cls.feature}
                        align={"center"}
                        alignItems="center"
                        height={"13%"}
                    >
                        <p>Настройки по объекту</p>
                    </HFlexBox>
                </FeatureBlock>
            </HFlexBox>
        </DetailView>
    );

    return (
        <div className={classNames(cls.SettingsPage, {}, [])}>{content}</div>
    );
};

export default SettingsPage;
