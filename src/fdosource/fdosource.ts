import { RecordEntry } from "./record-entry";

export async function getPIDRecord(pid: string): Promise<RecordEntry[]> {
    return [
        {
            "index": 1,
            "type": "21.T11148/076759916209e5d62bd5",
            "data": {
                "format": "string",
                "value": pid
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 2,
            "type": "21.T11148/397d831aa3a9d18eb52c",
            "data": {
                "format": "string",
                "value": "2022-06-06T00:00:00+00:00"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 3,
            "type": "21.T11148/82e2503c49209e987740",
            "data": {
                "format": "string",
                "value": "{ \"sha512sum\": \"653e874977b3695aac75ef20f237cfc25b5cfff1e72bab0c5cbec5ce0eb7fa3b0a6b29049cbfcf0d2e6f961c7a2d5c5ad1ac2b7d83db194f7aba6ab2518ddc9f\" }"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 4,
            "type": "21.T11148/29f92bd203dd3eaa5a1f",
            "data": {
                "format": "string",
                "value": "20220605 19:48:04 UTC"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 5,
            "type": "21.T11148/b8457812905b83046284",
            "data": {
                "format": "string",
                "value": "https://b2share.eudat.eu/api/files/5fc88ad5-2f13-483c-8b80-a5862c91dbbb/Biological.tar#L7_dc3e2161576ff12aa04a2f6a4f7bb69a.jpg"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 6,
            "type": "21.T11148/c692273deb2772da307f",
            "data": {
                "format": "string",
                "value": "1.0.0"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 7,
            "type": "21.T11148/1c699a5d1b4ad3ba4956",
            "data": {
                "format": "string",
                "value": "21.T11148/1a1e620666cb1713acde"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 8,
            "type": "21.T11148/1c699a5d1b4ad3ba4956",
            "data": {
                "format": "string",
                "value": "21.T11981/fac82546-f933-4fc9-9a0c-bcd72b33b90f"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 9,
            "type": "21.T11148/2f314c8fe5fb6a0063a8",
            "data": {
                "format": "string",
                "value": "https://creativecommons.org/licenses/by/4.0/"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 10,
            "type": "21.T11148/d0773859091aeb451528",
            "data": {
                "format": "string",
                "value": "21.T11981/73bfcca4-9f2b-4cfc-a003-30f5a51aab84"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 11,
            "type": "21.T11148/1a73af9e7ae00182733b",
            "data": {
                "format": "string",
                "value": "https://www.scc.kit.edu/personen/14958.php"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 12,
            "type": "21.T11148/1a73af9e7ae00182733b",
            "data": {
                "format": "string",
                "value": "https://www.scc.kit.edu/personen/12474.php"
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        },
        {
            "index": 100,
            "type": "HS_ADMIN",
            "data": {
                "format": "admin",
                "value": {
                    "handle": "21.T11981/USER01",
                    "index": 300,
                    "permissions": "111111111111"
                }
            },
            "ttl": 86400,
            "timestamp": "2022-07-06T09:43:46Z"
        }
    ];
}