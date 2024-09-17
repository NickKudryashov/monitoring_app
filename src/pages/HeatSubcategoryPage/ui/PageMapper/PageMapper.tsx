import { SubHeader } from "@/features/PageHeader/SubHeader/SubHeader";
import { ReactElement, useMemo } from "react";
import { useSelector } from "react-redux";
import { getSubTab, getTab } from "@/widgets/SubcategoryTabs";
import { PollBlock } from "../ArchiveView/PollBlock/PollBlock";
import {
    getArchives,
    getConfigParams,
} from "@/pages/HeatSubcategoryPage/api/api";
import {
    EventCardList,
    EventLogList,
    getUserEventsByHeat,
    getUserEventsProcessingByHeat,
} from "@/entities/UserEvents";
import { ParametersDict } from "../HeatSubcategoryPage/HeatSubcategoryPage";
import { HeatDevice, HeatParameters } from "@/entities/Heatcounters";
import { SimpleReport } from "../ArchiveView/SimpleReport/SimpleReport";
import { ReportSettings } from "../ArchiveView/ReportSettings/ReportSettings";
import { ReportFilesView } from "../ArchiveView/ReportFilesView/ReportFilesView";
import { ParameterView } from "../ParameterView/ParameterView";
import { EventEditor } from "@/widgets/EventEditor";
import { ConfigParameterColumn } from "../ConfigParameterColumn/ConfigParameterColumn";
import { GeneralAnswer } from "@/features/PageHeader/api/api";
import { useParams } from "react-router-dom";
import { SystemsInfoBLock } from "../SystemsInfoBlock/SystemsInfoBlock";
import { ChartBuilder } from "@/widgets/ChartBuilder";
import { MOCK_STR_ID } from "@/shared/lib/util/constants";
import classNames from "@/shared/lib/classNames/classNames";

interface PageTabMapperProps {
    deviceData?: HeatDevice;
    generalData?: GeneralAnswer;
    className?: string;
}

export const PageTabMapper = (props: PageTabMapperProps): ReactElement => {
    const { deviceData, generalData, className = "" } = props;
    const { id } = useParams<{ id: string }>();
    const selectedTab = useSelector(getTab);
    const selectedSubTab = useSelector(getSubTab);
    const { data: archData, isLoading: archLoading } = getArchives(
        id ?? MOCK_STR_ID,
        {
            skip: id === undefined,
        },
    );
    const { data: configParameters } = getConfigParams(
        String(deviceData?.systems[selectedSubTab]?.id),
        { skip: deviceData === undefined || deviceData?.systems === undefined },
    );
    const { data: events } = getUserEventsByHeat(Number(id));

    const { data: processingEvents } = getUserEventsProcessingByHeat(
        Number(id),
    );

    const filterInstant = (params: HeatParameters[]) =>
        params?.filter((el) => el.parameter_type === "instant_parameter");
    const filterAccumulate = (params: HeatParameters[]) =>
        params?.filter((el) => el.parameter_type === "accumulate_parameter");
    const allParams = (params: HeatParameters[]) =>
        params?.filter(
            (el) => !el.exclude && el.parameter_type === "instant_parameter",
        );
    const getParams = (
        filt: (params: HeatParameters[]) => HeatParameters[],
    ) => {
        const result: ParametersDict = {};
        if (deviceData?.systems) {
            deviceData.systems.map((el) => {
                const temp = filt(el.parameters) ?? [];
                result[el.id] = { systemName: el.name, parameters: temp };
            });
            return result;
        }
    };

    const params: ParametersDict = useMemo(
        () => getParams(allParams) || {},
        [deviceData],
    );
    const instantParams: ParametersDict = useMemo(
        () => getParams(filterInstant) || {},
        [deviceData],
    );
    const accumulateParams: ParametersDict = useMemo(
        () => getParams(filterAccumulate) || {},
        [deviceData],
    );

    return (
        <>
            {selectedTab === 0 && (
                <ParameterView className={className} params={params} />
            )}

            {selectedTab === 1 && selectedSubTab === 2 && (
                <EventEditor subcatData={generalData} />
            )}
            {selectedTab === 1 && selectedSubTab === 1 && (
                <EventLogList events={processingEvents} />
            )}
            {selectedTab === 1 && selectedSubTab === 0 && (
                <EventCardList events={events} />
            )}

            {selectedTab === 2 && selectedSubTab === 0 && deviceData && (
                <SystemsInfoBLock systems={deviceData?.systems} />
            )}
            {selectedTab === 2 &&
                (selectedSubTab === 1 || selectedSubTab == undefined) && (
                    <ParameterView
                        className={className}
                        params={instantParams}
                    />
                )}
            {selectedTab === 2 && selectedSubTab === 2 && (
                <ParameterView
                    className={className}
                    params={accumulateParams}
                />
            )}
            {selectedTab === 2 && selectedSubTab === 3 && configParameters && (
                <ConfigParameterColumn
                    className={className}
                    configParameters={configParameters}
                />
            )}

            {selectedTab === 3 && generalData && (
                <SubHeader generalData={generalData} />
            )}
            {selectedTab === 3 && selectedSubTab == 0 && deviceData && (
                <PollBlock deviceData={deviceData} />
            )}
            {selectedTab === 3 && selectedSubTab === 1 && deviceData && (
                <SimpleReport deviceData={deviceData} />
            )}
            {selectedTab === 3 &&
                selectedSubTab == 2 &&
                !archLoading &&
                deviceData &&
                archData &&
                generalData && (
                    <ReportSettings
                        archData={archData}
                        generalData={generalData}
                        deviceData={deviceData}
                    />
                )}
            {selectedTab === 3 &&
                selectedSubTab == 3 &&
                !archLoading &&
                deviceData &&
                archData &&
                generalData && (
                    <ReportFilesView
                        archData={archData}
                        generalData={generalData}
                        deviceData={deviceData}
                    />
                )}
            {selectedTab === 4 && <ChartBuilder subcatData={generalData} />}
            {selectedTab === 5 && <ParameterView params={params} />}
        </>
    );
};
