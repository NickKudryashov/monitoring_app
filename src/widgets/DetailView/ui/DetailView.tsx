import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import { ReactNode, useCallback, useMemo } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useDebounce } from "shared/hooks/useDebounce";

interface DetailViewProps {
    className?: string;
    children?: ReactNode;
    tabSelected?: boolean;
    generalSelected?: boolean;
    setTabSelected?: (val: boolean) => void;
    setGeneralSelected?: (val: boolean) => void;
    onWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
}
const GENERALTABSELECTEDKEY = "main_tab_selected";
export function DetailView(props: DetailViewProps) {
    const {
        className,
        children,
        setTabSelected,
        tabSelected,
        generalSelected,
        setGeneralSelected,
        onWheel,
    } = props;
    const navigate = useNavigate();
    if (generalSelected && tabSelected) {
        setTabSelected(false);
    }

    return (
        <div
            onWheel={onWheel}
            className={classNames(cls.DetailView, {}, [className])}
        >
            {children}
        </div>
    );
}
