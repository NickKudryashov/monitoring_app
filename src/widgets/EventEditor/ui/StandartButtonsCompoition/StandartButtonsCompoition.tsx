import { ReactElement, memo, useCallback } from "react";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./StandartButtonsCompoition.module.scss";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";

const BUTTONS_WITHOUT_SPACE = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
];
const BUTTONS_WITH_SPACE = [
    "!=",
    "==",
    "+",
    "-",
    "/",
    "*",
    "(",
    ")",
    ">",
    "<",
    ">=",
    "<=",
    "and",
    "or",
    "not",
];

interface StandartButtonsCompositionProps {
    setExpression: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StandartButtonsComposition = memo(
    (props: StandartButtonsCompositionProps): ReactElement => {
        const { setExpression } = props;
        const onClickWithSpace = useCallback(
            (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                val: string
            ) => {
                setExpression((prev) => [...prev, ` ${val} `]);
            },
            []
        );
        const onClickWithoutSpace = useCallback(
            (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                val: string
            ) => {
                setExpression((prev) => [...prev, val]);
            },
            []
        );
        const onClickRemoveLastElement = useCallback(
            (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setExpression((prev) => prev.slice(0, -1));
            },
            []
        );
        return (
            <HFlexBox
                align="space-around"
                alignItems="center"
                className={cls.buttons}
                height="55%"
            >
                {BUTTONS_WITHOUT_SPACE.map((el, i) => (
                    <AppButon
                        key={i}
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={cls.btn}
                        onClick={(e) => onClickWithoutSpace(e, el)}
                    >
                        {el}
                    </AppButon>
                ))}
                {BUTTONS_WITH_SPACE.map((el, i) => (
                    <AppButon
                        key={i}
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={cls.btn}
                        onClick={(e) => onClickWithSpace(e, el)}
                    >
                        {el}
                    </AppButon>
                ))}
                <AppButon
                    theme={AppButtonTheme.DESIGNED_OUTLINE}
                    className={cls.btn}
                    onClick={onClickRemoveLastElement}
                >
                    {"<-"}
                </AppButon>
            </HFlexBox>
        );
    }
);
