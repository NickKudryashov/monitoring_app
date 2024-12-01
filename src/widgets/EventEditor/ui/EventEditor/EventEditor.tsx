import { ReactElement, memo, useCallback, useState } from "react";
import { AppButon } from "@/shared/ui/AppButton/AppButton";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./EventEditor.module.scss";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import {
    getSelectedUserObject,
    ObjectList,
    useGetSelectedUserObject,
} from "@/entities/Objects";
import {
    SubcatTypes,
    SubcategoryListByObject,
    getAutoDeviceIdBySystem,
    getHeatDeviceIdBySystem,
    getPumpDeviceIdBySystem,
    getSelectedSubcategory,
    useGetSelectedSubcategory,
} from "@/entities/ObjectSubCategory";
import { StandartButtonsComposition } from "../StandartButtonsCompoition/StandartButtonsCompoition";
import {
    AllParametersView,
    HeatParameters,
    getHeatDeviceData,
} from "@/entities/Heatcounters";
import { PumpParametersComposition, getPumpData } from "@/entities/PumpDevice";
import { getAutomaticDevice } from "@/entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    AutoDevParametersComposition,
    AutoParameter,
} from "@/entities/AutomaticDevice";
import { PumpParameter } from "@/entities/PumpDevice/model/types/pumpDevice";
import {
    UserEventTypeSelect,
    createUserEvent,
    editUserEvent,
} from "@/entities/UserEvents";
import { UserEvent } from "@/entities/UserEvents/model/types/type";
import { GeneralAnswer } from "@/features/PageHeader/api/api";
import { useSelector } from "react-redux";
import { MOCK_ID } from "@/shared/lib/util/constants";

export const EventEditor = memo(
    (props: {
        event?: UserEvent;
        subcatData?: GeneralAnswer;
    }): ReactElement => {
        const { event, subcatData } = props;
        const [eventEnabled, setEventEnabled] = useState<boolean>(
            event?.enabled ?? true,
        );
        const [eventTitle, setEventTitle] = useState<string>(
            event?.title ?? "",
        );
        const [objID, setObjID] = useState<number | null>(null);
        const [subcatSetSubcatID, setSubcatID] = useState<number | null>(null);
        const [eventMessage, setEventMessage] = useState<string>(
            event?.description ?? "",
        );
        const [expression, setExpression] = useState<string[]>(
            event?.expression?.split(" ") ?? [],
        );
        const [eventType, setEventType] = useState<string>(
            event?.event_type ?? "information",
        );
        const [createEvent, { error, isError }] = createUserEvent();
        const [editEvent] = editUserEvent();

        const onCreateEvent = () => {
            if (event) {
                editEvent({
                    id: event.id,
                    description: eventMessage,
                    enabled: eventEnabled,
                    expression: expression.join(""),
                    title: eventTitle,
                    event_type: eventType,
                });
                return;
            }
            createEvent({
                description: eventMessage,
                enabled: eventEnabled,
                expression: expression.join(""),
                title: eventTitle,
                event_type: eventType,
            });
            if (isError && error && "status" in error) {
                console.log(error);
            }
        };

        const selectedObject = useGetSelectedUserObject();
        const selectedSubcat = useGetSelectedSubcategory();
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
            heatDeviceId?.device || MOCK_ID,
            {
                skip: !heatDeviceId?.device,
            },
        );
        const { data: pumpDevice } = getPumpData(
            pumpDeviceId?.device || MOCK_ID,
            {
                skip: !pumpDeviceId?.device,
            },
        );
        const { data: autoDevice } = getAutomaticDevice(
            autoDeviceId?.device || MOCK_ID,
            {
                skip: !autoDeviceId?.device,
            },
        );
        const heatParameterClickHandler = useCallback(
            (parameter: HeatParameters) => {
                setExpression((prev) => [
                    ...prev,
                    ` heatparam_${parameter.id} `,
                ]);
            },
            [],
        );
        const pumpParameterClickHandler = useCallback(
            (parameter: PumpParameter) => {
                setExpression((prev) => [
                    ...prev,
                    ` pumpparam_${parameter.id} `,
                ]);
            },
            [],
        );
        const autoParameterClickHandler = useCallback(
            (parameter: AutoParameter) => {
                setExpression((prev) => [
                    ...prev,
                    ` autoparam_${parameter.id} `,
                ]);
            },
            [],
        );
        return (
            <VFlexBox>
                <HFlexBox align="space-between" height="90%">
                    {isError && error && "data" in error && <p>{}</p>}
                    <VFlexBox align="space-between" width="35%">
                        <ObjectList
                            onSelectObjectProp={setObjID}
                            selectedObject={subcatData?.user_object}
                        />
                        <SubcategoryListByObject
                            objectID={objID ?? 0}
                            preselectedSubcategory={subcatData?.id}
                        />
                        <UserEventTypeSelect
                            onChange={setEventType}
                            value={eventType}
                        />
                        <AppInput
                            placeholder="Условие"
                            value={expression.join("")}
                        />
                        <AppInput
                            value={eventTitle}
                            placeholder="Название"
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                        <AppInput
                            placeholder="Текст события"
                            value={eventMessage}
                            onChange={(e) => setEventMessage(e.target.value)}
                        />
                        <AppInput
                            label="Включено"
                            type="checkbox"
                            checked={eventEnabled}
                            onChange={(e) => setEventEnabled(e.target.checked)}
                        />
                        <StandartButtonsComposition
                            setExpression={setExpression}
                        />
                    </VFlexBox>
                    <HFlexBox
                        width="60%"
                        height="90%"
                        className={cls.parametersPlate}
                    >
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.heat &&
                            heatDevice && (
                                <AllParametersView
                                    heatDevice={heatDevice}
                                    onParameterClick={heatParameterClickHandler}
                                    className={cls.heats}
                                />
                            )}
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.auto &&
                            autoDevice && (
                                <AutoDevParametersComposition
                                    autoDevice={autoDevice}
                                    onParameterClick={autoParameterClickHandler}
                                />
                            )}
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.pump &&
                            pumpDevice && (
                                <PumpParametersComposition
                                    onParameterClick={pumpParameterClickHandler}
                                    pumpDevice={pumpDevice}
                                />
                            )}
                    </HFlexBox>
                </HFlexBox>
                <AppButon onClick={onCreateEvent}>Отправить</AppButon>
            </VFlexBox>
        );
    },
);

EventEditor.displayName = "EventEditorWidget";
