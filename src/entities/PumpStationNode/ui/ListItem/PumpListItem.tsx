import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./PumpListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { PumpNode } from "entities/PumpStationNode/model/types/pumpStationNode";
import { Loader } from "shared/ui/Loader/Loader";

interface PumpListItemProps {
 className?: string;
 onNodeClick?:(node:PumpNode)=>void;
 object_id:number;
}

export const PumpListItem = memo((props: PropsWithChildren<PumpListItemProps>) => {
    const { className,onNodeClick,object_id,children } = props;
    const {data} = useSelector((state:StateSchema)=>state.pumpNodes);
    const nodeID = data.length>0 ? data?.filter((el)=> el.user_object===object_id)[0] : undefined;
    
    const {data : devlist} = useSelector((state:StateSchema)=>state.pumpDevices);
    const devCount = devlist.length>0 ? devlist?.filter((dev)=>dev?.node===nodeID?.id) : 0;
    const onClickHandler = (node:PumpNode)=> {
        onNodeClick(node);
    };
    if (!nodeID) {
        return (<Loader/>);
    }
    return (
        <div className={classNames(cls.PumpListItem,{},[className])}>
            
            {data!==undefined && data.length>0 && data.map((node)=>node.user_object===object_id && devCount ?
                <div key={node.id} className={cls.node}>
                    <div 
                        // className={classNames("",{[cls.selected]:selectedNode && (node.id===selectedNode.id)},[])} 
                        onClick={()=>onClickHandler(node)}
                    >
                        <AppLink to={RoutePathAuth.pumpnode+node.id} >
                            {node.name}
                        </AppLink>
                    </div>
                    {node.expanded && children}
                </div>
                :
                null
            )}
        </div>
    );
});
