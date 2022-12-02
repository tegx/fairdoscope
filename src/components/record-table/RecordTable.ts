import { ColumnDefinition, TabulatorFull as Tabulator } from 'tabulator-tables';
import { analyzePIDValue, createTooltip, renderTypeCell, renderValueCell, renderValuePlain } from './CellRenderes';
import { HandleRecordValue } from '../../services/handleapi/handle-record-entry';
import { getPIDRecord } from '../../services/handleapi/handleapi';
import "./FontAwesomeStyleHelper";
import * as tabulatorStyles from "!!to-string-loader!css-loader!tabulator-tables/dist/css/tabulator.min.css";
import * as tabulatorStylesMat from "!!to-string-loader!css-loader!tabulator-tables/dist/css/tabulator_materialize.min.css";
import * as fontawesome from "!!to-string-loader!css-loader!@fortawesome/fontawesome-free/css/fontawesome.min.css";
import * as fontawesomeSolid from "!!to-string-loader!css-loader!@fortawesome/fontawesome-free/css/solid.min.css";
import * as fontawesomeRegular from "!!to-string-loader!css-loader!@fortawesome/fontawesome-free/css/regular.css";
import { dataTypes, Renderer } from '../../mappings';
import { PIDChangeEvent } from './PIDChangeEvent';
// TODO find better solution for fontawesome imports

/** Table columns for interactive mode */
export const INTERACTIVE_COLUMNS: ColumnDefinition[] = [
    {
        title: "Index",
        field: "index",
        width: 100
    },
    {
        title: "Type",
        field: "type",
        formatter: renderTypeCell,
        //tooltip: createTooltip,
        width: 300
    },
    {
        title: "Value",
        field: "data.value",
        formatter: renderValueCell
    }
];

/** Table columns for plain mode */
export const PLAIN_COLUMNS: ColumnDefinition[] = [
    {
        title: "Index",
        field: "index",
        width: 100
    },
    {
        title: "Type",
        field: "type",
        formatter: renderValuePlain,
        tooltip: createTooltip,
        width: 300
    },
    {
        title: "Value",
        field: "data.value",
        formatter: renderValuePlain
    }
];


export class RecordTable extends HTMLElement {
    /** >>> HTML ATTRIBUTES */
    public interactive: boolean = false;
    public height: number = 0;
    public pid: string = "";
    /** <<< HTML ATTRIBUTES */
    private tabulatorElement: HTMLDivElement;
    private tabulator: Tabulator|null = null;
    private tableIsBuild = false;

    constructor() {
        super();

        this.tabulatorElement = document.createElement("div");
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = `
            <style>${tabulatorStyles}</style>
            <style>${tabulatorStylesMat}</style>
            <style>${fontawesome}</style>
            <style>${fontawesomeSolid}</style>
            <style>${fontawesomeRegular}</style>
        `;
        shadowRoot.append(this.tabulatorElement);
    }
    
    public static get observedAttributes() {
        return ["pid", "interactive", "height"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "pid":
                this.pid = newValue;
                if (oldValue !== newValue) this.handlePIDUpdate();
                break;
            case "interactive":
                this.interactive = (newValue === "true");
                break;
            case "height":
                this.height = parseInt(newValue);
                break;
        }
        this.updateTable();
    }

    private handlePIDUpdate() {
        if (!this.pid) return;
        getPIDRecord(this.pid)
            .then((entries: HandleRecordValue[]) => {
                if (!this.tableIsBuild || !this.tabulator) return;
                if (this.interactive) {
                    // we need to first analyze all value that are PIDs in the table, then pass the data to Tabulator
                    this.processInteractiveData(entries)
                        .then((analyzedEntries) => this.tabulator?.setData(analyzedEntries))
                        .catch(error => console.log("Error creating interactive data for table", error));
                } else {
                    this.tabulator.setData(entries);
                }
            })
            .catch(error => console.log(error));
    }

    /*
     * Analyzes all PID-values of an HandleRecord and replaces them with corresponding links
     */
    private processInteractiveData(entries: HandleRecordValue[]): Promise<HandleRecordValue[]> {
        return new Promise<HandleRecordValue[]>((resolve, reject) => {
            const entriesNotToAnalyze: HandleRecordValue[] = [];
            const entriesToAnalyze: HandleRecordValue[] = [];
            entries.map(entry => {
                if (dataTypes.has(entry.type) && dataTypes.get(entry.type)!.renderer === Renderer.Hdl) {
                    entriesToAnalyze.push(JSON.parse(JSON.stringify(entry))); // deep copy entires to anlyze; TODO not sure if required
                } else {
                    entriesNotToAnalyze.push(entry);
                }
            });
            const doingAnalysis = entriesToAnalyze.map(entry => analyzePIDValue(entry.data.value)
                .then(analyzedValue => entry.data.value = analyzedValue)
                .catch(error => console.log(`Could not anlyze PID ${entry.data.value}`, error))
            );
            Promise.all(doingAnalysis)
                .then(() => resolve([...entriesNotToAnalyze, ...entriesToAnalyze].sort((a, b) => a.index - b.index)))
                .catch(reject);
        });
    }

    private updateTable() {
        if (!this.tableIsBuild || !this.tabulator) return;
        this.tabulator.setColumns(this.interactive ? INTERACTIVE_COLUMNS : PLAIN_COLUMNS);
        this.tabulator.setHeight(this.height);
    }

    public connectedCallback() {
        this.tabulator = new Tabulator(this.tabulatorElement, {
            columns: this.interactive ? INTERACTIVE_COLUMNS : PLAIN_COLUMNS,
            layout: "fitColumns",
            height: `${this.height}px`
        });
        this.tabulator.on("tableBuilt", () => {
            this.tableIsBuild = true;
            this.updateTable();     // initial table update
            this.handlePIDUpdate(); // initial PID fetch
        });
        // adds an event-listener on every link that lead to another FDO
        this.tabulator.on("dataProcessed", () => {
            const pidAnchors = this.shadowRoot!.querySelectorAll("a.pid-change-link")
            for (let i = 0; i < pidAnchors.length; ++i) {
                pidAnchors[i]!.addEventListener("click", (e) => {
                    e.preventDefault();
                    const pid = pidAnchors[i]!.getAttribute("data-pid");
                    if (pid) this.shadowRoot!.dispatchEvent(new PIDChangeEvent(pid));
                });

            }
        });
    }

    // destructor, called when component is removed from DOM
    public disconnectedCallback() {
        this.tabulator?.destroy();
        this.tabulatorElement.innerHTML = '';
        this.tableIsBuild = false;
    }
}

customElements.define("record-table", RecordTable);