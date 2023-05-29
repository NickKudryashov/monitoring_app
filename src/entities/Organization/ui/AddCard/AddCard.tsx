import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./AddCard.module.scss";
import AddIcon from "shared/assets/icons/plusIcon.svg";
import type { PropsWithChildren } from "react";

interface AddCardProps {
 className?: string;
}

export const AddCard = memo((props: PropsWithChildren<AddCardProps>) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AddCard,{},[className])}>
            <AddIcon  width={"70%"} height={"70%"}/>
        </div>
    );
});
