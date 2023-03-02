

import type { PropsWithChildren } from "react";

interface MockComponentProps {
 className?: string;
}

export function MockComponent(props: PropsWithChildren<MockComponentProps>) {
    const { className } = props;

    return (
        <div>
            Заглушка
        </div>
    );
}