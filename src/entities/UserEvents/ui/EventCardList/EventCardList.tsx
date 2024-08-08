import { ReactElement, memo } from "react";
import cls from "./EventCardList.module.scss";
import { UserEvent } from "entities/UserEvents/model/types/type";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { EventCard } from "../EventCard/EventCard";

interface EventCardListProps {
    className?: string;
    events: UserEvent[] | undefined;
}

export const EventCardList = memo((props: EventCardListProps): ReactElement => {
    const { events = [], className = "" } = props;
    return (
        <VFlexBox className={classNames("", {}, [className])}>
            {events &&
                events.map((userEvent) => (
                    <EventCard event={userEvent} key={userEvent.id} />
                ))}
        </VFlexBox>
    );
});
