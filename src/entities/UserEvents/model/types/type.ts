export interface UserEvent {
    id:number;
    shared_to_users:number[];
    heat_devices:number[];
    auto_devices:number[];
    pump_devices:number[];
    title:string;
    description:string;
    enabled:boolean;
    archived:boolean;
    expression:string;
    event_type:string;
}

export interface UserEventProcessing extends UserEvent {
    datetime:string;
}