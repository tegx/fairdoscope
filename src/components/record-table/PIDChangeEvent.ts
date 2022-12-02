export class PIDChangeEvent extends CustomEvent<string> {
    constructor(pid: string) {
        super('pid-changed', {
            detail: pid,
            bubbles: true,
            composed: true
        })
    }
}