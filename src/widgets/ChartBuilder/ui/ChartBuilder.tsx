import {
    AutoDevParametersComposition,
    AutoParameter,
} from "@/entities/AutomaticDevice";
import { getAutomaticDevice } from "@/entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    BaseChart,
    createPdfByChartId,
    getAutoParameterForChart,
    getHeatParameterForChart,
    getPumpParameterForChart,
    useChartActions,
} from "@/entities/Chart";
import {
    AllParametersView,
    HeatParameters,
    getHeatDeviceData,
} from "@/entities/Heatcounters";
import {
    SubcatTypes,
    SubcategoryListByObject,
    getAutoDeviceIdBySystem,
    getHeatDeviceIdBySystem,
    getPumpDeviceIdBySystem,
    getSelectedSubcategory,
    useGetSelectedSubcategory,
} from "@/entities/ObjectSubCategory";
import {
    getSelectedUserObject,
    ObjectList,
    useGetSelectedUserObject,
} from "@/entities/Objects";
import { PumpParametersComposition, getPumpData } from "@/entities/PumpDevice";
import { PumpParameter } from "@/entities/PumpDevice/model/types/pumpDevice";
import { GeneralAnswer } from "@/features/PageHeader/api/api";
import {
    ReactElement,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { Modal } from "@/shared/ui/Modal/Modal";
import cls from "./ChartBuilder.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import {
    getAutoParameters,
    getHeatParameters,
    getPumpParameters,
    getReportData,
    getSelectedParameters,
} from "../model/selectors/selectors";
import { useSelector } from "react-redux";
import { useChartBuilderActions } from "../model/slice/slice";
import { SubtabContent, SubtabContentDeleteProps } from "../model/types/type";
import { dataToString } from "../helpers/reportDataToStrings";
import { MOCK_ID } from "@/shared/lib/util/constants";
interface ChartBuilderProps {
    subcatData?: GeneralAnswer;
}

export const ChartBuilder = memo((props: ChartBuilderProps): ReactElement => {
    const { subcatData } = props;
    const selectedObject = useGetSelectedUserObject();
    const selectedSubcat = useGetSelectedSubcategory();
    const selectedHeatParamaters = useSelector(getHeatParameters);
    const selectedAutoParamaters = useSelector(getAutoParameters);
    const selectedPumpParamaters = useSelector(getPumpParameters);
    const [parametersModalIsOpen, setParameterModalIsOpen] = useState(false);
    const [panelHide, setPanelHide] = useState(false);
    const selectedParameters = useSelector(getSelectedParameters);
    const reportData = useSelector(getReportData);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const prevStartDate = useRef<string>();
    const prevEndDate = useRef<string>();
    const { addDataset, clearDatasets, removeDataset } = useChartActions();
    const {
        addAutoParameter,
        addChartData,
        addHeatParameter,
        addPumpParameter,
        cleanup,
        removeChartData,
        removeParameter: removeParameterAction,
    } = useChartBuilderActions();
    const { data: heatDeviceId } = getHeatDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.heat,
        },
    );
    const { data: autoDeviceId } = getAutoDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.auto,
        },
    );
    const { data: pumpDeviceId } = getPumpDeviceIdBySystem(
        String(selectedSubcat?.id),
        {
            skip:
                !selectedSubcat?.id ||
                selectedSubcat.subcategory_type !== SubcatTypes.pump,
        },
    );

    const { data: heatDevice } = getHeatDeviceData(
        heatDeviceId?.device ?? MOCK_ID,
        {
            skip: !heatDeviceId?.device,
        },
    );
    const { data: pumpDevice } = getPumpData(pumpDeviceId?.device ?? MOCK_ID, {
        skip: !pumpDeviceId?.device,
    });
    const { data: autoDevice } = getAutomaticDevice(
        autoDeviceId?.device ?? MOCK_ID,
        {
            skip: !autoDeviceId?.device,
        },
    );

    const heatParameterClickHandler = useCallback(
        async (parameter: HeatParameters) => {
            if (!selectedSubcat || !selectedObject || !heatDevice) {
                return;
            }
            const parameterNameVerb = `${parameter.verbose_name} ${parameter.tag}`;

            addHeatParameter({
                id: parameter.id,
                name: parameterNameVerb,
                subcat_id: selectedSubcat.id,
                user_object_id: selectedObject.id,
            });
            const parameterDataset = await getHeatParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            addChartData({
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
            });
            addDataset({
                name: parameterNameVerb,
                data: parameterDataset.datalist,
                id: parameter.id,
            });
        },
        [endDate, heatDevice, selectedObject, selectedSubcat, startDate],
    );
    const pumpParameterClickHandler = useCallback(
        async (parameter: PumpParameter) => {
            if (!selectedSubcat || !selectedObject || !pumpDevice) {
                return;
            }
            const parameterNameVerb = parameter.verbose_name;
            addPumpParameter({
                id: parameter.id,
                name: parameter.verbose_name,
                subcat_id: selectedSubcat.id,
                user_object_id: selectedObject.id,
            });
            const parameterDataset = await getPumpParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            addChartData({
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
            });

            addDataset({
                name: parameterNameVerb,
                data: parameterDataset.datalist,
                id: parameter.id,
            });
        },
        [endDate, pumpDevice, selectedObject, selectedSubcat, startDate],
    );
    const autoParameterClickHandler = useCallback(
        async (parameter: AutoParameter) => {
            if (!selectedSubcat || !selectedObject || !autoDevice) {
                return;
            }
            const parameterNameVerb = parameter.tag;
            addAutoParameter({
                id: parameter.id,
                name: parameter.tag,
                subcat_id: selectedSubcat.id,
                user_object_id: selectedObject.id,
            });
            const parameterDataset = await getAutoParameterForChart({
                startDate: startDate,
                endDate: endDate,
                id: parameter.id,
            });
            addChartData({
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
            });

            addDataset({
                name: parameterNameVerb,
                data: parameterDataset.datalist,
                id: parameter.id,
            });
        },
        [selectedSubcat, selectedObject, autoDevice, startDate, endDate],
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
            cleanup();
            clearDatasets();
        }
    }, [endDate, startDate]);
    useEffect(() => {
        return () => {
            cleanup();
            clearDatasets();
        };
    }, []);
    const removeParameter = useCallback(
        (subtype: string, content: SubtabContentDeleteProps) => {
            let parameterCollection: SubtabContent[];
            switch (subtype as SubcatTypes) {
                case SubcatTypes.heat:
                    parameterCollection = selectedHeatParamaters.filter(
                        (el) =>
                            el.id === content.id && el.name === content.name,
                    );
                    break;
                case SubcatTypes.auto:
                    parameterCollection = selectedAutoParamaters.filter(
                        (el) =>
                            el.id === content.id && el.name === content.name,
                    );
                    break;
                case SubcatTypes.pump:
                    parameterCollection = selectedPumpParamaters.filter(
                        (el) =>
                            el.id === content.id && el.name === content.name,
                    );
                    break;
                default:
                    parameterCollection = [];
            }
            const [selectedParameter] = parameterCollection.filter(
                (el) => el.id === content.id && el.name === content.name,
            );
            removeDataset({
                id: selectedParameter.id,
                name: selectedParameter.name,
            });
            removeParameterAction({
                subtype: subtype as SubcatTypes,
                content: selectedParameter,
            });
            removeChartData({
                id: selectedParameter.id,
                subcat_id: selectedParameter.subcat_id,
                user_object_id: selectedParameter.user_object_id,
            });
        },
        [
            selectedAutoParamaters,
            selectedHeatParamaters,
            selectedPumpParamaters,
        ],
    );

    const pdfCreateClickHandler = useCallback(() => {
        if (reportData) {
            const content = dataToString(reportData);
            createPdfByChartId("simple-bar", content);
        }
    }, [reportData]);

    return (
        <HFlexBox align="space-between" className={cls.chartBuilder}>
            <BaseChart
                className={classNames(
                    cls.chart,
                    { [cls.chartFull]: panelHide },
                    [],
                )}
                start_date={startDate}
                end_date={endDate}
            />
            <VFlexBox
                gap="10px"
                className={classNames(
                    cls.settingsBox,
                    { [cls.collapsed]: panelHide },
                    [],
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
                                theme={InputThemes.SHADOW}
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
                                theme={InputThemes.SHADOW}
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
                            objectID={selectedObject ? selectedObject.id : 0}
                            preselectedSubcategory={subcatData?.id}
                        />
                        <AppButon
                            theme={AppButtonTheme.SHADOW}
                            disabled={!(!!startDate && !!endDate)}
                            onClick={() => setParameterModalIsOpen(true)}
                        >
                            Выбрать параметры
                        </AppButon>
                        <AppButon
                            theme={AppButtonTheme.SHADOW}
                            onClick={pdfCreateClickHandler}
                        >
                            В пдф
                        </AppButon>
                        <VFlexBox gap="7px">
                            {Object.keys(selectedParameters).map((subtype) =>
                                selectedParameters[subtype as SubcatTypes]?.map(
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
                                    ),
                                ),
                            )}
                        </VFlexBox>
                    </>
                )}
                <AppButon
                    theme={AppButtonTheme.SHADOW}
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
                            SubcatTypes.heat &&
                            heatDevice && (
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
                            SubcatTypes.auto &&
                            autoDevice && (
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
                            SubcatTypes.pump &&
                            pumpDevice && (
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

ChartBuilder.displayName = "ChartBuilderWidget";
