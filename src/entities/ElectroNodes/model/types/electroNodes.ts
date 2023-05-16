export interface ElectroNodeData {
    user_object:number;
    id:number
    user:number;
    name:string;
    expanded?:boolean;
}


export interface ElectroNodesSchema {
isLoading: boolean;
data?: ElectroNodeData[];
error?: string;
selectedNode?:ElectroNodeData
}