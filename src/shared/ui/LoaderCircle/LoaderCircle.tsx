import { ReactElement } from "react";
import cls from "./LoaderCircle.module.scss";
export const LoaderCircle = (): ReactElement => {
    return <span className={cls.loader}></span>;
};
