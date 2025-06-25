export interface PidsIds {
    [s: number]: number[]
}

export interface ObjectResponse {
    name: string
    address: string
    abonent: string
    id: number
    category: number
    pids_with_ids?: PidsIds
    cats: number[]
    last_update: string
    visible: boolean
    enabled: boolean
}
