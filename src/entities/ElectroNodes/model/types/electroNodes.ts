export interface ElectroNodeData {
    user_object:number;
    id:number
    user:number;
    name:string;
    expanded?:boolean;
    electro_node_device?:any [];

}


export interface ElectroNodesSchema {
isLoading: boolean;
data?: ElectroNodeData[];
error?: string;
selectedNode?:ElectroNodeData
}