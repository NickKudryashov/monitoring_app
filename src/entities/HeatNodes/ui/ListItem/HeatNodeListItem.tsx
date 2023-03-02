import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatNodeListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { heatNodeSlice } from "entities/HeatNodes/reducers/reducers";
import { HeatNodeResponse } from "entities/HeatNodes/types/types";

interface HeatNodeListItemProps {
 className?: string;
 object_id:number;
 onNodeClick:(node:HeatNodeResponse)=>void;
}

export function HeatNodeListItem(props: PropsWithChildren<HeatNodeListItemProps>) {
    const { className,object_id,children,onNodeClick } = props;
    const {heatNodes,selectedNode} = useAppSelector(state=>state.heatNodeReducer);
    const dispatch = useAppDispatch();
    const {expand} = heatNodeSlice.actions;
    const onClickHandler = (node:HeatNodeResponse)=> {
        dispatch(expand(node.id));
        onNodeClick(node);
    };
    return (
        <div className={classNames(cls.HeatNodeListItem,{},[className])}>
            {heatNodes.map((node)=>node.user_object===object_id &&
            <div key={node.id} className={cls.node}>
                <div className={classNames("",{[cls.selected]:selectedNode && (node.id===selectedNode.id)},[])} onClick={()=>onClickHandler(node)}>{node.name}</div>
                {node.expanded && children}
            </div>
            )}
        </div>
    );
}