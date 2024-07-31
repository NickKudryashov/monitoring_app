import {
    AutoDevParametersComposition,
    AutoParameter,
} from "entities/AutomaticDevice";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    BaseChart,
    chartActions,
    createPdfByChartId,
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
    getSelectedSubcategory,
} from "entities/ObjectSubCategory";
import { getSelectedUserObject, ObjectList } from "entities/Objects";
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
import classNames from "shared/lib/classNames/classNames";
import {
    getReportData,
    getSelectedParameters,
} from "../model/selectors/selectors";
import { useSelector } from "react-redux";
import { chartBuilderActions } from "../model/slice/slice";
import { SubtabContent, SubtabContentDeleteProps } from "../model/types/type";
import { dataToString } from "../helpers/reportDataToStrings";
interface ChartBuilderProps {
    subcatData?: GeneralAnswer;
}

export const ChartBuilder = memo((props: ChartBuilderProps): ReactElement => {
    const { subcatData } = props;
    const selectedObject = useSelector(getSelectedUserObject);
    const selectedSubcat = useSelector(getSelectedSubcategory);
    const [parametersModalIsOpen, setParameterModalIsOpen] = useState(false);
    const [panelHide, setPanelHide] = useState(false);
    const dispatch = useAppDispatch();
    const selectedParameters = useSelector(getSelectedParameters);
    const reportData = useSelector(getReportData);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const prevStartDate = useRef<string>();
    const prevEndDate = useRef<string>();
    const { data: heatDeviceId } = getHeatDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.heat,
        }
    );
    const { data: autoDeviceId } = getAutoDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.auto,
        }
    );
    const { data: pumpDeviceId } = getPumpDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.pump,
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
            const parameterNameVerb = `${parameter.verbose_name} ${parameter.tag}`;

            dispatch(
                chartBuilderActions.addHeatParameter({
                    id: parameter.id,
                    name: parameterNameVerb,
                    subcat_id: selectedSubcat.id,
                    user_object_id: selectedObject.id,
                })
            );
            const parameterDataset = await getHeatParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartBuilderActions.addChartData({
                    userObjectData: selectedObject,
                    system: {
                        systemInfo: {
                            ...selectedSubcat,
                            name: `${selectedSubcat.name} ${heatDevice.device_type_verbose_name} №${heatDevice.device_num}`,
                        },
                        parameter: {
                            id: parameter.id,
                            max_value: parameterDataset.max,
                            min_value: parameterDataset.min,
                            name: parameterNameVerb,
                        },
                    },
                })
            );

            dispatch(
                chartActions.addDataset({
                    name: parameterNameVerb,
                    data: parameterDataset.datalist,
                    id: parameter.id,
                })
            );
        },
        [
            dispatch,
            endDate,
            heatDevice,
            selectedObject,
            selectedSubcat,
            startDate,
        ]
    );
    const pumpParameterClickHandler = useCallback(
        async (parameter: PumpParameter) => {
            const parameterNameVerb = parameter.verbose_name;
            dispatch(
                chartBuilderActions.addPumpParameter({
                    id: parameter.id,
                    name: parameter.verbose_name,
                    subcat_id: selectedSubcat.id,
                    user_object_id: selectedObject.id,
                })
            );
            const parameterDataset = await getPumpParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartBuilderActions.addChartData({
                    userObjectData: selectedObject,
                    system: {
                        systemInfo: {
                            ...selectedSubcat,
                            name: `${selectedSubcat.name} ${pumpDevice.device_type_verbose_name}`,
                        },
                        parameter: {
                            id: parameter.id,
                            max_value: parameterDataset.max,
                            min_value: parameterDataset.min,
                            name: parameterNameVerb,
                        },
                    },
                })
            );

            dispatch(
                chartActions.addDataset({
                    name: parameterNameVerb,
                    data: parameterDataset.datalist,
                    id: parameter.id,
                })
            );
        },
        [
            dispatch,
            endDate,
            pumpDevice,
            selectedObject,
            selectedSubcat,
            startDate,
        ]
    );
    const autoParameterClickHandler = useCallback(
        async (parameter: AutoParameter) => {
            const parameterNameVerb = parameter.tag;
            dispatch(
                chartBuilderActions.addAutoParameter({
                    id: parameter.id,
                    name: parameter.tag,
                    subcat_id: selectedSubcat.id,
                    user_object_id: selectedObject.id,
                })
            );
            const parameterDataset = await getAutoParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            dispatch(
                chartBuilderActions.addChartData({
                    userObjectData: selectedObject,
                    system: {
                        systemInfo: {
                            ...selectedSubcat,
                            name: `${selectedSubcat.name} ${autoDevice.device_type_verbose}`,
                        },
                        parameter: {
                            id: parameter.id,
                            max_value: parameterDataset.max,
                            min_value: parameterDataset.min,
                            name: parameterNameVerb,
                        },
                    },
                })
            );

            dispatch(
                chartActions.addDataset({
                    name: parameterNameVerb,
                    data: parameterDataset.datalist,
                    id: parameter.id,
                })
            );
        },
        [
            dispatch,
            selectedSubcat,
            selectedObject,
            autoDevice,
            startDate,
            endDate,
        ]
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
            dispatch(chartBuilderActions.cleanup());
            dispatch(chartActions.clearDatasets());
        }
    }, [dispatch, endDate, startDate]);
    useEffect(() => {
        return () => {
            dispatch(chartBuilderActions.cleanup());
            dispatch(chartActions.clearDatasets());
        };
    });
    const removeParameter = useCallback(
        (subtype: string, content: SubtabContentDeleteProps) => {
            const [selectedParameter] = selectedParameters[
                subtype as SubcatTypes
            ].filter((el) => el.id === content.id && el.name === content.name);
            dispatch(
                chartActions.removeDataset({
                    id: selectedParameter.id,
                    name: selectedParameter.name,
                })
            );
            dispatch(
                chartBuilderActions.removeParameter({
                    subtype: subtype as SubcatTypes,
                    content: selectedParameter,
                })
            );
            dispatch(
                chartBuilderActions.removeChartData({
                    id: selectedParameter.id,
                    subcat_id: selectedParameter.subcat_id,
                    user_object_id: selectedParameter.user_object_id,
                })
            );
        },
        [dispatch, selectedParameters]
    );

    const pdfCreateClickHandler = useCallback(() => {
        const content = dataToString(reportData);
        createPdfByChartId("simple-bar", content);
    }, [reportData]);

    return (
        <HFlexBox align="space-between" className={cls.chartBuilder}>
            <BaseChart
                className={classNames(
                    cls.chart,
                    { [cls.chartFull]: panelHide },
                    []
                )}
                start_date={startDate}
                end_date={endDate}
            />
            <VFlexBox
                className={classNames(
                    cls.settingsBox,
                    { [cls.collapsed]: panelHide },
                    []
                )}
            >
                {!panelHide && (
                    <>
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
                        <ObjectList selectedObject={subcatData?.user_object} />
                        <SubcategoryListByObject
                            objectID={selectedObject ? selectedObject.id : null}
                            preselectedSubcategory={subcatData?.id}
                        />
                        <AppButon
                            disabled={!(!!startDate && !!endDate)}
                            onClick={() => setParameterModalIsOpen(true)}
                        >
                            Выбрать параметры
                        </AppButon>
                        <AppButon onClick={pdfCreateClickHandler}>
                            В пдф
                        </AppButon>
                        <VFlexBox gap="7px">
                            {Object.keys(selectedParameters).map((subtype) =>
                                selectedParameters[subtype as SubcatTypes].map(
                                    (el) => (
                                        <p
                                            onClick={() =>
                                                removeParameter(subtype, el)
                                            }
                                            key={`${el.name}_${el.id}_${subtype}`}
                                            className={cls.selectedParameters}
                                        >
                                            {el.name}
                                        </p>
                                    )
                                )
                            )}
                        </VFlexBox>
                    </>
                )}
                <AppButon
                    className={cls.collapseBtn}
                    onClick={() => setPanelHide((prev) => !prev)}
                >
                    {panelHide ? "<" : ">"}
                </AppButon>
                <Modal
                    onClose={() => setParameterModalIsOpen(false)}
                    isOpen={parametersModalIsOpen}
                >
                    <VFlexBox className={cls.modal}>
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.heat && (
                            <AllParametersView
                                heatDevice={heatDevice}
                                className={cls.parametersModal}
                                onParameterClick={heatParameterClickHandler}
                                onParameterUnClick={(parameter) =>
                                    removeParameter(SubcatTypes.heat, {
                                        id: parameter.id,
                                        name: `${parameter.verbose_name} ${parameter.tag}`,
                                    })
                                }
                                selectedParametersIDs={
                                    getParametersIdByHeatSubtype
                                }
                            />
                        )}
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.auto && (
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
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.pump && (
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
