import classNames from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";

interface ModalProps {
 className?: string;
 isOpen?:boolean;
 onClose:()=>void;
}
const ANIMATION_DELAY=300;
export function Modal(props: PropsWithChildren<ModalProps>) {
    const { className,isOpen,onClose,children } = props;
    const [isClosing,setIsClosing] = useState(false);
    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const onContentClick = (e:React.MouseEvent)=>{
        e.stopPropagation();
    };

    const closeHandler = useCallback(()=>{
        if (onClose){
            setIsClosing(true);
            timerRef.current=setTimeout(()=>{
                setIsClosing(false);
                onClose();
            },ANIMATION_DELAY);
        }
    },[onClose]);

    const onKeyDown = useCallback((e:KeyboardEvent)=>{
        if (e.key==="Escape"){
            closeHandler();
        }
    },[closeHandler]);

    useEffect(()=>{
        if (isOpen)
        {
            document.addEventListener("keydown",onKeyDown);
        }
        return ()=>{
            document.removeEventListener("keydown",onKeyDown);
            clearTimeout(timerRef.current);
        };
    },[isOpen, onKeyDown]);
    return (
        <Portal>
            <div  className={classNames(cls.Modal,mods,[className])}>
                <div className={cls.overlay} onMouseDown={closeHandler} onMouseUp={e=>e.stopPropagation()}>
                    <div className={cls.content}  onClick={onContentClick} onMouseDown={onContentClick} onMouseUp={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}