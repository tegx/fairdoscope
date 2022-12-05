import { HandleRecord, HandleRecordValue } from "./handle-record-entry";

/**
 * Callback for the input field triggered if the search is triggered. This function resets the current FDO graph
 * and triggers the resolution of the FDO.
 */
export async function getPIDRecord(pid: string): Promise<HandleRecordValue[]> {
    return new Promise<HandleRecordValue[]>((resolve, reject) => {
        fetch(`https://hdl.handle.net/api/handles/${pid}`)
            .then((res: Response) => {
                res.json().then((record: HandleRecord) => {
                    const values = record.values || [];
                    resolve(values);
                })
                .catch(error => {
                    console.log(`[Error]: Parsing json response for PID: ${pid}`, error)
                    reject(error);
                });
            })
            .catch(error => {
                console.log(`[Error]: Retrieving PID: ${pid}`, error)
                reject(error);
            });
    });
}
