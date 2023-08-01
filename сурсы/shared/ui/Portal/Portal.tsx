
import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
 className?: string;
 element?:HTMLElement;
}

export function Portal(props: PropsWithChildren<PortalProps>) {
    const { className,element=document.body,children } = props;

    return createPortal(children,element);
}