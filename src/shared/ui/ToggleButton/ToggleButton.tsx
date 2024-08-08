import { BaseHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react";
import cls from "./ToggleButton.module.scss";
import { HFlexBox } from "../FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";

interface ToggleButtonProps extends InputHTMLAttributes<HTMLDivElement> {
    toggled: boolean;
    setToggled: (a: boolean) => void;
    width?: string;
    height?: string;
    label?: string;
}

export const ToggleButton = (props: ToggleButtonProps) => {
    const { setToggled, toggled, width, height, label, className = "" } = props;
    return (
        <HFlexBox
            width={width}
            height={height}
            className={classNames("", {}, [className])}
        >
            <input
                className={cls.switchCheckbox}
                id={"react-switch-new"}
                type="checkbox"
                checked={toggled}
                onChange={(e) => setToggled(e.target.checked)}
            />
            <label className={cls.switchLabel} htmlFor={"react-switch-new"}>
                <span className={cls.switchButton} />
            </label>
            {label && <p className={cls.label}>{label}</p>}
        </HFlexBox>
    );
};
