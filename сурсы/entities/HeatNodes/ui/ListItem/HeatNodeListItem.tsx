import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatNodeListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { heatNodeSlice } from "entities/HeatNodes/reducers/reducers";
import { HeatNodeResponse } from "entities/HeatNodes/types/types";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

interface HeatNodeListItemProps {
 className?: string;
 object_id:number;
 onNodeClick:(node:HeatNodeResponse)=>void;
}

export function HeatNodeListItem(props: PropsWithChildren<HeatNodeListItemProps>) {
    const { className,object_id,children,onNodeClick } = props;
    const {heatNodes,selectedNode} = useSelector((state:StateSchema)=>state.heatNodes);
    const dispatch = useAppDispatch();
    const {expand} = heatNodeSlice.actions;
    const onClickHandler = (node:HeatNodeResponse)=> {
        dispatch(expand(node.id));
        onNodeClick(node);
    };
    return (
        <div className={classNames(cls.HeatNodeListItem,{},[className])}>
            {heatNodes.map((node)=>node.user_object===object_id && node?.count >0 && 
            <div key={node.id} className={cls.node}>
                <div className={classNames("",{[cls.selected]:selectedNode && (node.id===selectedNode.id)},[])}
                    onClick={()=>onClickHandler(node)}
                >
                    <AppLink to={RoutePathAuth.heatnode+node.id} replace>
                        {node.name}
                    </AppLink>
                </div>
                {node.expanded && children}
            </div>
            )}
        </div>
    );
}