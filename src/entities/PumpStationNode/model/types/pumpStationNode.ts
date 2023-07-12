export interface PumpStationNodeSchema {
isLoading: boolean;
data?: PumpNode[];
error?: string;
}

export interface PumpNode {
    id:number;
    user_object:number;
    name:string;
    expanded?:boolean;
} 