export interface HandleRecord {
    responseCode: number;
    handle: string;
    values: HandleRecordValue[];
}

export interface HandleRecordValue {
    type: string;
    index: number;
    data: {
        value: any;
        format: string;
    },
    ttl: number;
    timestamp: string;
}
