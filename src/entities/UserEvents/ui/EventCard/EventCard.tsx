import { memo, useState } from "react";
import { UserEvent } from "../../model/types/type";
import cls from "./EventCard.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { LoaderCircle } from "shared/ui/LoaderCircle/LoaderCircle";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { editUserEvent } from "entities/UserEvents/api/api";
import classNames from "shared/lib/classNames/classNames";

interface EventCardProps {
    className?: string;
    event: UserEvent;
}

export const EventCard = memo((props: EventCardProps) => {
    const { event, className } = props;
    const [eventEnabled, setEventEnabled] = useState<boolean>(event?.enabled);
    const [eventTitle, setEventTitle] = useState<string>(event?.title);
    const [eventMessage, setEventMessage] = useState<string>(
        event?.description
    );
    const [toggleEvent] = editUserEvent();
    const onEventToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventEnabled((prev) => !prev);
        toggleEvent({ id: event.id, enabled: e.target.checked });
    };
    if (!event) {
        return <LoaderCircle />;
    }
    return (
        <VFlexBox
            align="space-around"
            width="90%"
            height="20%"
            className={classNames(cls.eventCard, {}, [className])}
        >
            <p style={{ textAlign: "center" }}>{event?.title}</p>
            <HFlexBox alignItems="center" align="center" height="20%">
                <p>Включено:</p>
                <AppInput
                    className={cls.enabledInp}
                    type="checkbox"
                    checked={eventEnabled}
                    onChange={onEventToggle}
                />
            </HFlexBox>
            <p
                style={{ textAlign: "center" }}
            >{`Текст события: ${event?.description}`}</p>
        </VFlexBox>
    );
});
