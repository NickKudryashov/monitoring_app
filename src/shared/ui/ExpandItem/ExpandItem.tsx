import classNames from "@/shared/lib/classNames/classNames";
import cls from "./ExpandItem.module.scss";

import { PropsWithChildren, useState } from "react";

interface ExpandItemProps {
    className?: string;
    name?: string;
}

export function ExpandItem(props: PropsWithChildren<ExpandItemProps>) {
    const { className = "", children, name = "" } = props;
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={classNames(cls.ExpandItem, {}, [className])}>
            <b onClick={() => setExpanded((expanded) => !expanded)}>{name}</b>
            {expanded && children}
        </div>
    );
}
