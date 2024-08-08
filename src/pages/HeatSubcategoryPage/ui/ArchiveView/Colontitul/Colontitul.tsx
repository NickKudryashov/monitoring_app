import { ReactElement, useCallback, useEffect, useState } from "react";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./Colontitul.module.scss";
import classNames from "shared/lib/classNames/classNames";
import {
    ColontitulResponse,
    createUpCol,
    editDownCol,
    editUpCol,
} from "pages/HeatSubcategoryPage/api/api";
import { useDebounce } from "shared/hooks/useDebounce";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
const MOCK_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface ColontitulProps {
    cols?: ColontitulResponse[];
    up: boolean;
    create?: () => void;
}

interface EditArgs {
    id: number;
    name?: string;
    value?: string;
}

function Colontitul(props: ColontitulProps): ReactElement {
    const { cols, create, up = true } = props;
    const [editcol] = editUpCol();
    const [editDowncol] = editDownCol();

    const debouncedUp = useDebounce(editcol, 1500);
    const debouncedDown = useDebounce(editDowncol, 1500);
    const editName = useCallback((propsEdit: EditArgs) => {
        const { id, name, value } = propsEdit;
        up
            ? debouncedUp({ id, name: name, value: value })
            : debouncedDown({ id, name: name, value: value });
    }, []);

    return (
        <VFlexBox>
            <VFlexBox
                height="90%"
                gap="5px"
                alignItems="end"
                className={cls.Colontitul}
            >
                {cols?.map((el) => (
                    <HFlexBox
                        height="20%"
                        className={cls.row}
                        alignItems="center"
                        align="space-around"
                        key={el.id}
                    >
                        <AppInput
                            type="checkbox"
                            checked={el.enabled}
                            onChange={(e) =>
                                editcol({
                                    id: el.id,
                                    enabled: e.target.checked,
                                })
                            }
                        />
                        {/* <AppInput placeholder="Ключ:" onChange={(e)=>debounced({id:el.id,namecol:e.target.value})}value={el.name} className={classNames(cls.input,{},[cls.keyInput])}/> */}
                        <KeyField edit={editName} el={el} />
                        <ValueField edit={editName} el={el} />
                        {/* <AppInput placeholder="Значение" onChange={(e)=>editName({id:el.id,value:e.target.value})}className={cls.input} value={el.value}/> */}
                    </HFlexBox>
                ))}
                <AppButon
                    className={cls.btn}
                    height="25%"
                    width="40%"
                    onClick={create}
                    theme={AppButtonTheme.SHADOW}
                >
                    Добавить
                </AppButon>
            </VFlexBox>
        </VFlexBox>
    );
}

function KeyField({
    edit,
    el,
}: {
    edit: (props: EditArgs) => void;
    el: ColontitulResponse;
}): ReactElement {
    const [keycol, setKeyCol] = useState(el?.name);

    useEffect(() => {
        setKeyCol(el?.name);
    }, [el]);

    const onChangeName = (props: EditArgs) => {
        if (props.name) {
            setKeyCol(props.name);
            edit({ id: el.id, name: props.name });
        }
    };
    return (
        <AppInput
            placeholder="Ключ:"
            onChange={(e) => onChangeName({ id: el.id, name: e.target.value })}
            value={keycol}
            className={classNames(cls.input, {}, [cls.keyInput])}
        />
    );
}

function ValueField({
    edit,
    el,
}: {
    edit: (props: EditArgs) => void;
    el: ColontitulResponse;
}): ReactElement {
    const [keycol, setKeyCol] = useState(el?.value);

    useEffect(() => {
        setKeyCol(el?.value);
    }, [el]);

    const onChangeName = (props: EditArgs) => {
        if (props.value) {
            setKeyCol(props.value);
            edit({ id: el.id, value: props.value });
        }
    };
    return (
        <AppInput
            placeholder="Значение"
            onChange={(e) => onChangeName({ id: el.id, value: e.target.value })}
            className={cls.input}
            value={keycol}
        />
    );
}

export { Colontitul };
