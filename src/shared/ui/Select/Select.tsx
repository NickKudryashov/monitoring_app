import { ChangeEvent, useMemo } from "react";
import cls from "./Select.module.scss";
import classNames from "@/shared/lib/classNames/classNames";

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

export const SelectTheme = {
    SHADOW: "shadow",
} as const;

export type SelectTheme = (typeof SelectTheme)[keyof typeof SelectTheme];

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    theme?: SelectTheme;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className = "",
        label,
        options,
        onChange,
        value,
        readonly,
        theme = SelectTheme.SHADOW,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };

    const optionsList = useMemo(
        () =>
            options?.map((opt) => (
                <option
                    className={cls.option}
                    value={opt.value}
                    key={opt.value}
                >
                    {opt.content}
                </option>
            )),
        [options],
    );

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <span className={cls.label}>{`${label}`}</span>}
            <select
                disabled={readonly}
                className={classNames(cls.select, {}, [cls[theme]])}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
};
