import { ReactElement, memo, useCallback, useState } from "react";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./EventEditor.module.scss";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { ObjectList } from "entities/Objects";
import {
    SubcatTypes,
    SubcategoryListByObject,
    getAutoDeviceIdBySystem,
    getHeatDeviceIdBySystem,
    getPumpDeviceIdBySystem,
} from "entities/ObjectSubCategory";
import { StandartButtonsComposition } from "../StandartButtonsCompoition/StandartButtonsCompoition";
import {
    ParameterColumnBySystem,
    getHeatDeviceData,
} from "entities/Heatcounters";
import {
    PumpParameterColumn,
    getPumpData,
    getPumpDataDetail,
} from "entities/PumpDevice";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import {
    AutoParameter,
    AutoParameterColumn,
    AutoParameterRow,
} from "entities/AutomaticDevice";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import {
    UserEventTypeSelect,
    createUserEvent,
    editUserEvent,
    getUserEventsTypes,
} from "entities/UserEvents";
import { UserEvent } from "entities/UserEvents/model/types/type";
export const EventEditor = memo(
    (props: { event?: UserEvent }): ReactElement => {
        const { event } = props;
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

        const [selectedObject, setSelectedObject] = useState<number>(null);
        const [selectedSubcat, setSelectedSubcat] =
            useState<{ id: number; subcat_type: SubcatTypes }>(null);
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
        return (
            <VFlexBox>
                <HFlexBox align="space-between" height="90%">
                    {isError && error && "data" in error && <p>{}</p>}
                    <VFlexBox align="space-between" width="35%">
                        <ObjectList onSelectObject={setSelectedObject} />
                        <SubcategoryListByObject
                            objectID={selectedObject}
                            setSelectedSubcategory={setSelectedSubcat}
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
                        {heatDevice &&
                            selectedSubcat?.subcat_type === SubcatTypes.heat &&
                            heatDevice?.systems?.map((system) => (
                                <ParameterColumnBySystem
                                    key={system.id}
                                    params={system.parameters}
                                    header={system.name}
                                    onParameterClick={(parameter) =>
                                        setExpression((prev) => [
                                            ...prev,
                                            ` heatparam_${parameter.id} `,
                                        ])
                                    }
                                />
                            ))}
                        {autoDevice &&
                            selectedSubcat?.subcat_type ===
                                SubcatTypes.auto && (
                                <VFlexBox>
                                    <HFlexBox>
                                        {Object.values(
                                            autoDevice?.resultParamGroup
                                        ).map((parameter, i) => (
                                            <AutoParameterColumn
                                                key={i}
                                                header={"Контур"}
                                                fullHeight
                                                params={parameter}
                                                onParameterClick={(parameter) =>
                                                    setExpression((prev) => [
                                                        ...prev,
                                                        ` autoparam_${parameter.id} `,
                                                    ])
                                                }
                                            />
                                        ))}
                                    </HFlexBox>
                                </VFlexBox>
                            )}
                        {pumpDevice &&
                            selectedSubcat?.subcat_type === SubcatTypes.pump &&
                            Object.keys(pumpDevice?.parametersByGroup)?.map(
                                (group, i) => (
                                    <PumpParameterColumn
                                        key={i}
                                        header={group}
                                        onParameterClick={(
                                            parameter: PumpParameter
                                        ) =>
                                            setExpression((prev) => [
                                                ...prev,
                                                ` pumpparam_${parameter.id} `,
                                            ])
                                        }
                                        params={
                                            pumpDevice.parametersByGroup[group]
                                        }
                                    />
                                )
                            )}
                    </HFlexBox>
                </HFlexBox>
                <AppButon onClick={onCreateEvent}>Отправить</AppButon>
            </VFlexBox>
        );
    }
);
