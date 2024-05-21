export interface ArchiveEvent {
    id:number;
    message:string;
    event_datetime:string;
    system:string;
}

export interface ArchiveEventsSliceSchema {
    events:ArchiveEvent[];
    isLoading:boolean;
}