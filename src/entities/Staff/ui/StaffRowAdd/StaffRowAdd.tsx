import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./StaffRowAdd.module.scss";
import AddIcon from "shared/assets/icons/plusIcon.svg";
import type { PropsWithChildren } from "react";

interface StaffRowAddProps {
 className?: string;
}

export const StaffRowAdd = memo((props: PropsWithChildren<StaffRowAddProps>) => {
    const { className } = props;

    return (
        <div className={classNames(cls.StaffRowAdd,{},[className])}>
            <AddIcon width={"10%"}  />
        </div>
    );
});
