export interface RecordEntry {
    type: string;
    index: number;
    data: {
        value: any;
        format: string;
    },
    ttl: number;
    timestamp: string;
}
