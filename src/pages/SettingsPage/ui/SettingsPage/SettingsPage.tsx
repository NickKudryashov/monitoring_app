import { PropsWithChildren, useState } from "react";
import { DetailView } from "@/widgets/DetailView";
import cls from "./SettingsPage.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import Card from "antd/es/card/Card";
import { AddDevice } from "@/features/AddDevice/AddDevice";
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
    const navigate = useNavigate();
    const content = (
        <DetailView>
            <Flex wrap gap="middle">
                <Card type="inner" className={cls.card} title={"Объекты"} />
                <Card
                    type="inner"
                    className={cls.card}
                    title={"Системы и приборы"}
                >
                    <AddDevice />
                </Card>
                <Card
                    type="inner"
                    className={cls.card}
                    title={"Пользователи"}
                />
                <Card
                    type="inner"
                    className={cls.card}
                    title={"Быстрое добавление"}
                />
                <Card type="inner" className={cls.card} title={"Пусто"} />
                <Card type="inner" className={cls.card} title={"Пусто"} />
            </Flex>
        </DetailView>
    );

    return (
        <div className={classNames(cls.SettingsPage, {}, [])}>{content}</div>
    );
};

export default SettingsPage;
