import { ReactElement, memo, useCallback, useState } from "react";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./EventEditor.module.scss";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getSelectedUserObject, ObjectList } from "entities/Objects";
import {
    SubcatTypes,
    SubcategoryListByObject,
    getAutoDeviceIdBySystem,
    getHeatDeviceIdBySystem,
    getPumpDeviceIdBySystem,
    getSelectedSubcategory,
} from "entities/ObjectSubCategory";
import { StandartButtonsComposition } from "../StandartButtonsCompoition/StandartButtonsCompoition";
import {
    AllParametersView,
    HeatParameters,
    getHeatDeviceData,
} from "entities/Heatcounters";
import { PumpParametersComposition, getPumpData } from "entities/PumpDevice";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    AutoDevParametersComposition,
    AutoParameter,
} from "entities/AutomaticDevice";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import {
    UserEventTypeSelect,
    createUserEvent,
    editUserEvent,
} from "entities/UserEvents";
import { UserEvent } from "entities/UserEvents/model/types/type";
import { GeneralAnswer } from "features/PageHeader/api/api";
import { useSelector } from "react-redux";

interface SubcatStateProps {
    id: number;
    subcat_type: SubcatTypes;
}

export const EventEditor = memo(
    (props: {
        event?: UserEvent;
        subcatData?: GeneralAnswer;
    }): ReactElement => {
        const { event, subcatData } = props;
        const [eventEnabled, setEventEnabled] = useState<boolean>(
            event?.enabled ?? true
        );
        const [eventTitle, setEventTitle] = useState<string>(
            event?.title ?? ""
        );
        const [eventMessage, setEventMessage] = useState<string>(
            event?.description ?? ""
        );
        const [expression, setExpression] = useState<string[]>(
            event?.expression?.split(" ") ?? []
        );
        const [eventType, setEventType] = useState<string>(
            event?.event_type ?? "information"
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

        const selectedObject = useSelector(getSelectedUserObject);
        const selectedSubcat = useSelector(getSelectedSubcategory);
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
            (parameter: HeatParameters) => {
                setExpression((prev) => [
                    ...prev,
                    ` heatparam_${parameter.id} `,
                ]);
            },
            []
        );
        const pumpParameterClickHandler = useCallback(
            (parameter: PumpParameter) => {
                setExpression((prev) => [
                    ...prev,
                    ` pumpparam_${parameter.id} `,
                ]);
            },
            []
        );
        const autoParameterClickHandler = useCallback(
            (parameter: AutoParameter) => {
                setExpression((prev) => [
                    ...prev,
                    ` autoparam_${parameter.id} `,
                ]);
            },
            []
        );
        return (
            <VFlexBox>
                <HFlexBox align="space-between" height="90%">
                    {isError && error && "data" in error && <p>{}</p>}
                    <VFlexBox align="space-between" width="35%">
                        <ObjectList selectedObject={subcatData?.user_object} />
                        <SubcategoryListByObject
                            objectID={selectedObject?.id}
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
                            SubcatTypes.heat && (
                            <AllParametersView
                                heatDevice={heatDevice}
                                onParameterClick={heatParameterClickHandler}
                            />
                        )}
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.auto && (
                            <AutoDevParametersComposition
                                autoDevice={autoDevice}
                                onParameterClick={autoParameterClickHandler}
                            />
                        )}
                        {selectedSubcat?.subcategory_type ===
                            SubcatTypes.pump && (
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
    }
);
