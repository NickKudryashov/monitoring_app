import { ReactElement } from "react";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ReportParameters.module.scss";
import {
    ParametersResponse,
    editParameter,
} from "@/pages/HeatSubcategoryPage/api/api";
const MOCK_ROWS = [
    "Дата",
    "Время",
    "M1",
    "M2",
    "M3",
    "M1-M2",
    "M2-M1",
    "V1",
    "V2",
    "V1-V2",
    "V2-V1",
    "V3",
    "t1",
    "t2",
    "t1-t2",
    "t3",
    "t4",
    "tatm",
    "P1",
    "P2",
    "P3",
    "Тр",
    "НС",
];

interface ReportParametersProps {
    parameters: ParametersResponse[] | undefined;
}

function ReportParameters(props: ReportParametersProps): ReactElement {
    const { parameters } = props;
    const [edit] = editParameter();
    return (
        <VFlexBox width="95%" height="15%" align="space-around">
            <p className={cls.subheader}>Настройка параметров</p>
            <HFlexBox height="90%" gap="5px" className={cls.ReportParameters}>
                {parameters?.map((el) => (
                    <VFlexBox
                        height="95%"
                        width={`${100 / MOCK_ROWS.length}%`}
                        className={cls.row}
                        alignItems="center"
                        align="space-around"
                        key={el.id}
                    >
                        <p className={cls.paramNameBox}>{el.name}</p>
                        <AppInput
                            checked={el.enabled}
                            onChange={(e) =>
                                edit({ id: el.id, enabled: e.target.checked })
                            }
                            type="checkbox"
                        />
                    </VFlexBox>
                ))}
            </HFlexBox>
        </VFlexBox>
    );
}

export { ReportParameters };
