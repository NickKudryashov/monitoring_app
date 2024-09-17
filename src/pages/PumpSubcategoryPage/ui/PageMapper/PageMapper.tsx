import {
    DetailParameter,
    PumpDetailInfo,
    PumpDeviceData,
    PumpParameterColumn,
} from "@/entities/PumpDevice";
import {
    EventCardList,
    EventLogList,
    getUserEventsByPump,
    getUserEventsProcessingByPump,
} from "@/entities/UserEvents";
import { getPumpPageParameterGroup } from "@/pages/PumpSubcategoryPage/model/selectors";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import classNames from "@/shared/lib/classNames/classNames";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { EventEditor } from "@/widgets/EventEditor";
import { getSubTab, getTab } from "@/widgets/SubcategoryTabs";
import cls from "./PageMapper.module.scss";
import { useParams } from "react-router-dom";
import { GeneralAnswer } from "@/features/PageHeader/api/api";
import { ChartBuilder } from "@/widgets/ChartBuilder";
interface PageMapperProps {
    deviceDataDetail: PumpDetailInfo;
    devData: PumpDeviceData;
    generalData: GeneralAnswer;
}
export const PageMapper = (props: PageMapperProps): ReactElement => {
    const { deviceDataDetail, devData, generalData } = props;
    const { id } = useParams<{ id: string }>();
    const selectedTab = useSelector(getTab);
    const selectedSubTab = useSelector(getSubTab);
    const selectedSubgroup = useSelector(getPumpPageParameterGroup);
    const { data: events } = getUserEventsByPump(Number(id));
    const { data: processingEvents } = getUserEventsProcessingByPump(
        Number(id)
    );

    return (
        <HFlexBox
            className={classNames(cls.paramGroups, {}, [])}
            align="center"
            alignItems="start"
        >
            {selectedTab === 0 &&
                Object.keys(devData?.parametersByGroup)?.map((grName, i) => (
                    <PumpParameterColumn
                        key={i}
                        params={devData?.parametersByGroup[grName]}
                        header={grName}
                    />
                ))}
            {selectedTab === 2 &&
                deviceDataDetail &&
                selectedSubgroup === "errors" && (
                    <DetailParameter
                        errors={
                            deviceDataDetail.parametersByGroup[
                                deviceDataDetail?.systemIndexByName[
                                    selectedSubTab
                                ]
                            ]?.errors
                        }
                        header={
                            deviceDataDetail?.systemIndexByName[
                                selectedSubTab
                            ] + " неисправности"
                        }
                    />
                )}
            {selectedTab === 2 &&
                deviceDataDetail &&
                selectedSubgroup === "general" && (
                    <DetailParameter
                        params={
                            deviceDataDetail.parametersByGroup[
                                deviceDataDetail?.systemIndexByName[
                                    selectedSubTab
                                ]
                            ]?.general
                        }
                        header={
                            deviceDataDetail?.systemIndexByName[
                                selectedSubTab
                            ] + " общие параметры"
                        }
                    />
                )}
            {selectedTab === 2 &&
                deviceDataDetail &&
                selectedSubgroup === undefined && (
                    <PumpParameterColumn
                        params={
                            devData?.parametersByGroup[
                                deviceDataDetail?.systemIndexByName[
                                    selectedSubTab
                                ]
                            ]
                        }
                        header={
                            deviceDataDetail?.systemIndexByName[selectedSubTab]
                        }
                    />
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
            {selectedTab === 4 && <ChartBuilder subcatData={generalData} />}
        </HFlexBox>
    );
};
