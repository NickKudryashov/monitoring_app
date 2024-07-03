import {
    AutoDevParametersComposition,
    AutoParameter,
} from "entities/AutomaticDevice";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    BaseChart,
    chartActions,
    getAutoParameterForChart,
    getHeatParameterForChart,
    getPumpParameterForChart,
} from "entities/Chart";
import {
    AllParametersView,
    HeatParameters,
    getHeatDeviceData,
} from "entities/Heatcounters";
import {
    SubcatTypes,
    SubcategoryListByObject,
    getAutoDeviceIdBySystem,
    getHeatDeviceIdBySystem,
    getPumpDeviceIdBySystem,
} from "entities/ObjectSubCategory";
import { ObjectList } from "entities/Objects";
import { PumpParametersComposition, getPumpData } from "entities/PumpDevice";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { UserEventTypeSelect } from "entities/UserEvents";
import { GeneralAnswer } from "features/PageHeader/api/api";
import {
    ReactElement,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { Modal } from "shared/ui/Modal/Modal";
import cls from "./ChartBuilder.module.scss";
interface ChartBuilderProps {
    subcatData?: GeneralAnswer;
}

export const ChartBuilder = memo((props: ChartBuilderProps): ReactElement => {
    const { subcatData } = props;
    const [selectedObject, setSelectedObject] = useState<number>(
        subcatData?.user_object || null
    );
    const [selectedSubcat, setSelectedSubcat] = useState<{
        id: number;
        subcat_type: SubcatTypes;
    }>(
        subcatData
            ? { id: subcatData.id, subcat_type: subcatData.subcategory_type }
            : null
    );
    const [parametersModalIsOpen, setParameterModalIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedParameters, setSelectedParameters] = useState({
        [SubcatTypes.heat]: [],
        [SubcatTypes.auto]: [],
        [SubcatTypes.pump]: [],
    });
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const prevStartDate = useRef<string>();
    const prevEndDate = useRef<string>();
    const { data: heatDeviceId } = getHeatDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcat_type !== SubcatTypes.heat,
        }
    );
    const { data: autoDeviceId } = getAutoDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcat_type !== SubcatTypes.auto,
        }
    );
    const { data: pumpDeviceId } = getPumpDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcat_type !== SubcatTypes.pump,
        }
    );

    const { data: heatDevice } = getHeatDeviceData(heatDeviceId?.device, {
        skip: !heatDeviceId?.device,
    });
    const { data: pumpDevice } = getPumpData(pumpDeviceId?.device, {
        skip: !pumpDeviceId?.device,
    });
    const { data: autoDevice } = getAutomaticDevice(autoDeviceId?.device, {
        skip: !autoDeviceId?.device,
    });

    const heatParameterClickHandler = useCallback(
        async (parameter: HeatParameters) => {
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.heat]: [...prev[SubcatTypes.heat], parameter.id],
            }));
            const parameterDataset = await getHeatParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartActions.addDataset({
                    name: parameter.name,
                    data: parameterDataset,
                })
            );
        },
        [endDate, startDate]
    );
    const pumpParameterClickHandler = useCallback(
        async (parameter: PumpParameter) => {
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.pump]: [...prev[SubcatTypes.pump], parameter.id],
            }));
            const parameterDataset = await getPumpParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartActions.addDataset({
                    name: parameter.verbose_name,
                    data: parameterDataset,
                })
            );
        },
        [endDate, startDate]
    );
    const autoParameterClickHandler = useCallback(
        async (parameter: AutoParameter) => {
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.auto]: [...prev[SubcatTypes.auto], parameter.id],
            }));
            const parameterDataset = await getAutoParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartActions.addDataset({
                    name: parameter.tag,
                    data: parameterDataset,
                })
            );
        },
        [endDate, startDate]
    );
    useEffect(() => {
        if (
            !(!!startDate && !!endDate) ||
            (endDate === prevEndDate.current &&
                startDate === prevStartDate.current)
        ) {
            return;
        } else {
            setSelectedParameters({
                [SubcatTypes.heat]: [],
                [SubcatTypes.auto]: [],
                [SubcatTypes.pump]: [],
            });
            dispatch(chartActions.clearDatasets());
        }
    }, [dispatch, endDate, startDate]);
    return (
        <HFlexBox align="space-between">
            <BaseChart start_date={startDate} end_date={endDate} />
            <VFlexBox width="50%">
                <HFlexBox
                    className={cls.datetimepicker}
                    height="10%"
                    alignItems="center"
                    align="space-between"
                >
                    <p>{"с  "}</p>
                    <AppInput
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate((prev) => {
                                prevStartDate.current = prev;
                                return e.target.value;
                            })
                        }
                    />
                    <p>{"по  "}</p>
                    <AppInput
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate((prev) => {
                                prevEndDate.current = prev;
                                return e.target.value;
                            })
                        }
                    />
                </HFlexBox>
                <ObjectList
                    onSelectObject={setSelectedObject}
                    selectedObject={selectedObject}
                />
                <SubcategoryListByObject
                    objectID={selectedObject}
                    setSelectedSubcategory={setSelectedSubcat}
                    preselectedSubcategory={selectedSubcat}
                />
                <AppButon
                    disabled={!(!!startDate && !!endDate)}
                    onClick={() => setParameterModalIsOpen(true)}
                >
                    Выбрать параметры
                </AppButon>
                <Modal
                    onClose={() => setParameterModalIsOpen(false)}
                    isOpen={parametersModalIsOpen}
                >
                    <VFlexBox className={cls.modal}>
                        {selectedSubcat?.subcat_type === SubcatTypes.heat && (
                            <AllParametersView
                                heatDevice={heatDevice}
                                className={cls.parametersModal}
                                onParameterClick={heatParameterClickHandler}
                            />
                        )}
                        {selectedSubcat?.subcat_type === SubcatTypes.auto && (
                            <AutoDevParametersComposition
                                autoDevice={autoDevice}
                                className={cls.parametersModalAuto}
                                onParameterClick={autoParameterClickHandler}
                            />
                        )}
                        {selectedSubcat?.subcat_type === SubcatTypes.pump && (
                            <PumpParametersComposition
                                onParameterClick={pumpParameterClickHandler}
                                className={cls.parametersModalAuto}
                                pumpDevice={pumpDevice}
                            />
                        )}
                    </VFlexBox>
                </Modal>
            </VFlexBox>
        </HFlexBox>
    );
});
