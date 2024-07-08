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
    useMemo,
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
interface SubtabContent {
    name: string;
    id: number;
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
    const [selectedParameters, setSelectedParameters] = useState<
        Record<string, SubtabContent[]>
    >({
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
            if (
                selectedParameters[SubcatTypes.heat].filter(
                    (el) => el.id === parameter.id && el.name === parameter.name
                ).length > 0
            ) {
                return;
            }
            console.log(selectedParameters[SubcatTypes.heat]);
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.heat]: [
                    ...prev[SubcatTypes.heat],
                    { id: parameter.id, name: parameter.name },
                ],
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
                    id: parameter.id,
                })
            );
        },
        [dispatch, endDate, selectedParameters, startDate]
    );
    const pumpParameterClickHandler = useCallback(
        async (parameter: PumpParameter) => {
            if (
                selectedParameters[SubcatTypes.pump].filter(
                    (el) =>
                        el.id === parameter.id &&
                        el.name === parameter.verbose_name
                ).length > 0
            ) {
                return;
            }
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.pump]: [
                    ...prev[SubcatTypes.pump],
                    { id: parameter.id, name: parameter.verbose_name },
                ],
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
                    id: parameter.id,
                })
            );
        },
        [dispatch, endDate, selectedParameters, startDate]
    );
    const autoParameterClickHandler = useCallback(
        async (parameter: AutoParameter) => {
            if (
                selectedParameters[SubcatTypes.auto].filter(
                    (el) => el.id === parameter.id && el.name === parameter.tag
                ).length > 0
            ) {
                return;
            }
            setSelectedParameters((prev) => ({
                ...prev,
                [SubcatTypes.auto]: [
                    ...prev[SubcatTypes.auto],
                    { id: parameter.id, name: parameter.tag },
                ],
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
                    id: parameter.id,
                })
            );
        },
        [endDate, startDate, selectedParameters]
    );

    const getParametersIdByHeatSubtype = useMemo(() => {
        return selectedParameters[SubcatTypes.heat].map((el) => el.id);
    }, [selectedParameters]);
    const getParametersIdByAutoSubtype = useMemo(() => {
        return selectedParameters[SubcatTypes.auto].map((el) => el.id);
    }, [selectedParameters]);
    const getParametersIdByPumpSubtype = useMemo(() => {
        return selectedParameters[SubcatTypes.pump].map((el) => el.id);
    }, [selectedParameters]);

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

    const removeParameter = useCallback(
        (subtype: string, content: SubtabContent) => {
            setSelectedParameters((prev) => ({
                ...prev,
                [subtype]: prev[subtype].filter(
                    (el) => !(el.id === content.id && el.name === content.name)
                ),
            }));
            dispatch(
                chartActions.removeDataset({
                    id: content.id,
                    name: content.name,
                })
            );
        },
        [dispatch]
    );

    return (
        <HFlexBox align="space-between" className={cls.chartBuilder}>
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
                <VFlexBox gap="7px">
                    {Object.keys(selectedParameters).map((subtype) =>
                        selectedParameters[subtype].map((el) => (
                            <p
                                onClick={() => removeParameter(subtype, el)}
                                key={`${el.name}_${el.id}_${subtype}`}
                                className={cls.selectedParameters}
                            >
                                {el.name}
                            </p>
                        ))
                    )}
                </VFlexBox>
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
                                onParameterUnClick={(parameter) =>
                                    removeParameter(SubcatTypes.heat, {
                                        id: parameter.id,
                                        name: parameter.name,
                                    })
                                }
                                selectedParametersIDs={
                                    getParametersIdByHeatSubtype
                                }
                            />
                        )}
                        {selectedSubcat?.subcat_type === SubcatTypes.auto && (
                            <AutoDevParametersComposition
                                autoDevice={autoDevice}
                                className={cls.parametersModalAuto}
                                onParameterClick={autoParameterClickHandler}
                                onParameterUnClick={(parameter) =>
                                    removeParameter(SubcatTypes.auto, {
                                        id: parameter.id,
                                        name: parameter.tag,
                                    })
                                }
                                selectedParametersIDs={
                                    getParametersIdByAutoSubtype
                                }
                            />
                        )}
                        {selectedSubcat?.subcat_type === SubcatTypes.pump && (
                            <PumpParametersComposition
                                onParameterClick={pumpParameterClickHandler}
                                className={cls.parametersModalAuto}
                                pumpDevice={pumpDevice}
                                onParameterUnClick={(parameter) =>
                                    removeParameter(SubcatTypes.pump, {
                                        id: parameter.id,
                                        name: parameter.verbose_name,
                                    })
                                }
                                selectedParametersIDs={
                                    getParametersIdByPumpSubtype
                                }
                            />
                        )}
                    </VFlexBox>
                </Modal>
            </VFlexBox>
        </HFlexBox>
    );
});
