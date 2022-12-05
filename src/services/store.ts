import { HandleRecordValue } from "./handleapi/handle-record-entry";
import { getPIDRecord as handleGetPIDRecord } from "./handleapi/handleapi";

class _PIDStore {
    private store: Map<String, HandleRecordValue[]>;

    constructor() {
        this.store = new Map(); // caches all requested FDOs
        this.loadFromLocalStorage();
    }

    public getPIDRecord(pid: string) {
        return new Promise<HandleRecordValue[]>((resolve, reject) => {
            if (this.store.has(pid)) {
                resolve(this.store.get(pid)!);
            } else {
                handleGetPIDRecord(pid)
                    .then(recordValues => {
                        let isFairDO = false;
                        let profilePid = null;
                        for (let val of recordValues) {
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
                
                        this.store.set(pid, recordValues);
                        this.saveToLocalStorage();
                        resolve(recordValues);
                    })
                    .catch(reject);
            }
        });
    }

    public getStoredPIDs() {
        return this.store.keys();
    }

    public clear() {
        localStorage.removeItem("cached-pids");
        this.store = new Map();
    }

    private saveToLocalStorage() {
        localStorage.setItem("cached-pids", JSON.stringify(Array.from(this.store.entries())));
    }

    private loadFromLocalStorage() {
        const serializedRecords = localStorage.getItem("cached-pids");
        if (serializedRecords !== null) {
            this.store = new Map(JSON.parse(serializedRecords));
        }
    }
}

export const PIDStore = new _PIDStore();