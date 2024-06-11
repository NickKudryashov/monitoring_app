import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useDebounce } from "shared/hooks/useDebounce";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { Loader } from "shared/ui/Loader/Loader";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { LoaderCircle } from "shared/ui/LoaderCircle/LoaderCircle";

interface DetailViewProps {
    className?: string;
    children?: ReactNode;
    tabSelected?: boolean;
    generalSelected?: boolean;
    setTabSelected?: (val: boolean) => void;
    setGeneralSelected?: (val: boolean) => void;
    onScroll?: () => void;
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
        onScroll,
    } = props;
    const wheelCountRef = useRef<number>(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    if (generalSelected && tabSelected) {
        setTabSelected(false);
    }
    useEffect(() => {
        wheelCountRef.current = 0;
        window.scrollTo({ top: 0 });
        return () => {
            wheelCountRef.current = 0;
        };
    }, []);
    const debouncedScroll = useDebounce(onScroll, 150);
    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!onScroll) {
            return;
        }
        const scrollPositionKoefficient =
            wrapperRef.current.scrollTop / wrapperRef.current.scrollHeight;
        console.log(scrollPositionKoefficient);
        if (scrollPositionKoefficient < 0.086) {
            setStartAnimation(false);
        }
        if (scrollPositionKoefficient >= 0.086) {
            setStartAnimation(true);
        }
        if (scrollPositionKoefficient > 0.15) {
            wrapperRef.current.scrollTo({ top: 0 });
            debouncedScroll();
        }
    };

    return (
        <div
            // onWheel={wheelHandler}
            ref={wrapperRef}
            onScroll={onScrollHandler}
            className={classNames(
                cls.DetailView,
                { [cls.scrollPageBar]: onScroll !== undefined },
                [className]
            )}
        >
            {children}
            {startAnimation && (
                <HFlexBox
                    height="10%"
                    width="25%"
                    align="center"
                    alignItems="center"
                    className={cls.onPageScroll}
                >
                    <p>Прокрутите вниз для смены страницы...</p>
                    <LoaderCircle />
                </HFlexBox>
            )}
        </div>
    );
}
