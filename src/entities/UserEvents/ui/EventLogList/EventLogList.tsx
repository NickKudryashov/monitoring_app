import { UserEventProcessing } from "@/entities/UserEvents/model/types/type";
import { ReactElement, memo } from "react";
import classNames from "@/shared/lib/classNames/classNames";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./EventLogList.module.scss";
interface EventLogListProps {
    className?: string;
    events: UserEventProcessing[] | undefined;
}
export const EventLogList = memo((props: EventLogListProps): ReactElement => {
    const { events = [], className = "" } = props;
    return (
        <VFlexBox className={classNames(cls.EventLogList, {}, [className])}>
            {events &&
                events.map((userEvent) => (
                    <VFlexBox
                        height="15%"
                        width="80%"
                        alignItems="center"
                        align="center"
                        key={userEvent.id}
                        className={cls.logRow}
                    >
                        <p>{`[${userEvent.datetime}] ${userEvent.title}`}</p>
                        <p>{`${userEvent.description}`}</p>
                    </VFlexBox>
                ))}
        </VFlexBox>
    );
});
