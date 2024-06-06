export interface ArchiveEvent {
    id:number;
    message:string;
    user_object_info:string;
    event_datetime:string;
    system:string;
}

export interface ArchiveEventsSliceSchema {
    events:ArchiveEvent[];
    isLoading:boolean;
}