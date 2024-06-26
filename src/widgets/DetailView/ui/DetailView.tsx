import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import {
    ReactNode,
    memo,
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
    onScroll?: (isScrollDown: boolean) => void;
}
export const DetailView = memo((props: DetailViewProps) => {
    const { className, children, onScroll } = props;
    const initRef = useRef<boolean>(false);
    const previousScrollPosition = useRef<number>(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [enableScrollHandler, setEnabledScrollHandler] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const firstScrollToCenter = useCallback(() => {
        console.log("on load");
        if (onScroll) {
            wrapperRef.current.scrollTo({
                top: wrapperRef.current.scrollHeight * 0.2,
                behavior: "auto",
            });
            previousScrollPosition.current = wrapperRef.current.scrollTop;
        }
    }, [onScroll]);

    useEffect(() => {
        const timeout = setTimeout(firstScrollToCenter, 250);
        const timeout1 = setTimeout(() => setEnabledScrollHandler(true), 350);
        return () => {
            initRef.current = false;
            clearTimeout(timeout);
        };
    }, []);

    const debouncedScroll = useDebounce(onScroll, 200);
    const onScrollHandler = () => {
        if (!onScroll || !enableScrollHandler) {
            return;
        }
        const scrollPositionKoefficient =
            wrapperRef.current.scrollTop / wrapperRef.current.scrollHeight;
        const isScrollDown =
            wrapperRef.current.scrollTop < previousScrollPosition.current;
        previousScrollPosition.current = wrapperRef.current.scrollTop;
        if (
            scrollPositionKoefficient < 0.23 &&
            scrollPositionKoefficient > 0.095
        ) {
            setStartAnimation(false);
        }
        if (
            scrollPositionKoefficient >= 0.23 ||
            scrollPositionKoefficient <= 0.097
        ) {
            setStartAnimation(true);
        }
        if (
            scrollPositionKoefficient > 0.3 ||
            scrollPositionKoefficient < 0.01
        ) {
            wrapperRef.current.scrollTo({
                top: wrapperRef.current.scrollHeight * 0.2,
            });

            debouncedScroll(isScrollDown);
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
                    <p>Прокрутите для смены страницы...</p>
                    <LoaderCircle />
                </HFlexBox>
            )}
        </div>
    );
});
