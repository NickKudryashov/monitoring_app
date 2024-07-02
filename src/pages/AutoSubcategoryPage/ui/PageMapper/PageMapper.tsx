import {
    AutoParameterColumn,
    AutomaticDeviceData,
} from "entities/AutomaticDevice";
import {
    EventCardList,
    EventLogList,
    getUserEventsByAuto,
    getUserEventsProcessingByAuto,
} from "entities/UserEvents";
import { GeneralAnswer } from "features/PageHeader/api/api";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChartBuilder } from "widgets/ChartBuilder";
import { EventEditor } from "widgets/EventEditor";
import { getSubTab, getTab } from "widgets/SubcategoryTabs";

interface PageMapperProps {
    devData: AutomaticDeviceData;
    generalData: GeneralAnswer;
}

export const PageMapper = (props: PageMapperProps): ReactElement => {
    const { devData, generalData } = props;
    const selectedTab = useSelector(getTab);
    const selectedSubTab = useSelector(getSubTab);
    const { id } = useParams<{ id: string }>();
    const { data: events } = getUserEventsByAuto(Number(id));
    const { data: processingEvents } = getUserEventsProcessingByAuto(
        Number(id)
    );
    return (
        <>
            {selectedTab === 0 &&
                devData &&
                Object.values(devData?.systemParamGroup).map((el, i) => (
                    <AutoParameterColumn
                        fullHeight
                        key={i}
                        header={`Контур ${i + 1}`}
                        params={el}
                    />
                ))}
            {selectedTab === 2 &&
                devData &&
                Object.values(devData?.resultParamGroup).map((params, i) => (
                    <AutoParameterColumn
                        detail
                        fullHeight
                        key={i}
                        header={`Контур ${i + 1}`}
                        params={params}
                    />
                ))}
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
        </>
    );
};
