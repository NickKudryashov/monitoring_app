

import type { PropsWithChildren } from "react";

interface MockComponentProps {
 className?: string;
 name?:string;
}

export function MockComponent(props: PropsWithChildren<MockComponentProps>) {
    const { className,name } = props;
    alert("CALLED");
    return (
        <div>
            {`Заглушка ${name}`}
        </div>
    );
}