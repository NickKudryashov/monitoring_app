import { getUserEventsTypes } from "entities/UserEvents";
import { ReactElement, memo, useMemo } from "react";
import { Select } from "shared/ui/Select/Select";
interface UserEventTypeSelectProps {
    className?: string;
    value: string;
    onChange: (arg: string) => void;
}
export const UserEventTypeSelect = memo(
    (props: UserEventTypeSelectProps): ReactElement => {
        const { onChange, value, className } = props;
        const { data: eventTypes, isLoading } = getUserEventsTypes();
        const options = useMemo(() => {
            if (!eventTypes) {
                return [];
            }
            return Object.keys(eventTypes).map((el) => ({
                value: el,
                content: eventTypes[el],
            }));
        }, [eventTypes]);
        return (
            <Select
                options={options}
                onChange={onChange}
                value={value}
                label="Тип события"
                className={className}
            />
        );
    }
);
