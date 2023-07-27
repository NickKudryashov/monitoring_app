import cls from "./Loader.module.scss";

import type { PropsWithChildren } from "react";

interface LoaderProps {
 className?: string;
}

export function Loader(props: PropsWithChildren<LoaderProps>) {
    const { className } = props;

    return (
        <div className={cls["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>
    );
}