import classNames from "shared/lib/classNames/classNames";
import cls from "./ElectroNodeListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { electroNodesActions } from "entities/ElectroNodes/model/slice/electroNodes";
import { ElectroNodeData } from "entities/ElectroNodes/model/types/electroNodes";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { AppLink } from "shared/ui/AppLink/AppLink";

interface ElectroNodeListItemProps {
 className?: string;
 object_id:number;
 onNodeClick:(node:ElectroNodeData)=>void;
}

export function ElectroNodeListItem(props: PropsWithChildren<ElectroNodeListItemProps>) {
    const { className,object_id,children,onNodeClick } = props;
    const {data,selectedNode} = useSelector((state:StateSchema)=>state.electroNodes);
    const dispatch = useAppDispatch();
    const {expand} = electroNodesActions;
    const onClickHandler = (node:ElectroNodeData)=> {
        dispatch(expand(node.id));
        onNodeClick(node);
    };
    return (
        <div className={classNames(cls.ElectroNodeListItem,{},[className])}>
            {data!==undefined && data.map((node)=>node.user_object===object_id &&
            <div key={node.id} className={cls.node}>
                <div 
                    className={classNames("",{[cls.selected]:selectedNode && (node.id===selectedNode.id)},[])} 
                    onClick={()=>onClickHandler(node)}
                >
                    <AppLink to={RoutePathAuth.electronode+node.id} >
                        {node.name}
                    </AppLink>
                </div>
                {node.expanded && children}
            </div>
            )}
        </div>
    );
}