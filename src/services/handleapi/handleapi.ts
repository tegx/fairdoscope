import { HandleRecord, HandleRecordValue } from "./handle-record-entry";

/**
 * Callback for the input field triggered if the search is triggered. This function resets the current FDO graph
 * and triggers the resolution of the FDO.
 */
export async function getPIDRecord(pid: string): Promise<HandleRecordValue[]> {
    return new Promise<HandleRecordValue[]>((resolve, reject) => {
        let isFairDO = false;
        let profilePid = null;
        fetch(`https://hdl.handle.net/api/handles/${pid}`)
            .then((res: Response) => {
                res.json().then((record: HandleRecord) => {
                    const values = record.values || [];
                    for (let val of values) {
                        if (val.type === "21.T11148/076759916209e5d62bd5") {
                            profilePid = val.data.value;
                            isFairDO = true;
                        }
                    }

                    if(!isFairDO){
                        //addMessage(1, "Provided PID " + pid + " is no FDO.");
                        //continue and try to deal with it somehow
                        // return;
                    }
            
                    //addMessage(0, "Loading FDO from user-provided PID " + pid);
            
            
                    // let existing = data.nodes.find((entry) => entry.id == pid);
            
                    // if(!existing){
                    //     let node = {"id":pid, "profile": profilePid};
                    //     data.nodes.push(node);
                    // }
            
                    // if (!fdoHistory.includes(pid)) {
                    //     fdoHistory.push(pid);
                    //     localStorage.setItem("fdoHistory", JSON.stringify(fdoHistory));
                    // }
            
                    // treeData = [
                    //     {
                    //         "id": pid,
                    //         "profilePid": profilePid
                    //     }
                    // ];
            
                    resolve(values);
                })
                .catch(error => console.error(`Error parsing json response.`, error));
            })
            .catch(error => console.warn("Error retrieving PID.", error));
    });
}
